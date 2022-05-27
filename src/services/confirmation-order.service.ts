import {Injectable} from '@angular/core';
import {OrderDto} from "../app/models/OrderDto";
import jsPDF from 'jspdf';
import {Customer} from "../app/models/Customer";
import {Package} from "../app/models/Package";
import {saveAs} from "file-saver";

@Injectable({
    providedIn: 'root'
})
export class ConfirmationOrderService {

    constructor() {
    }

    public createConfirmationPDF(customer: Customer, receiver: Customer, pack: Package, order: OrderDto, deliveryId: string): void {

        let shippingCosts = 0.0;

        let pdf = new jsPDF('portrait', 'mm', 'a4');
        pdf.setFontSize(24);
        pdf.text('Trouvaille-Delivery GmbH', 20, 20);
        pdf.addImage('../assets/Logo_small.png', 'PNG', 170, 5, 15, 22);
        pdf.setFontSize(16);
        pdf.text(`Hallo ${customer.firstName},\n\nvielen Dank für Deine Bestellung  bei Trouvaille-Delivery.\nAlle Informationen zu Deiner Bestellung findest du in diesem \nDokument.\n`, 20, 40);

        pdf.setFontSize(22);
        pdf.text(`Lieferanschrift`, 20, 85);
        pdf.line(20, 87, 95, 87);
        pdf.text('Rechnungsanschrift ', 110, 85);
        pdf.line(110, 87, 190, 87);

        pdf.setFontSize(16);
        pdf.text(`${receiver.firstName} ${receiver.lastName} \n${order.destAddress.streetName} ${order.destAddress.streetNumber} \n${order.destAddress.zipCode} ${order.destAddress.city}`, 20, 95);
        pdf.text(`${customer.firstName} ${customer.lastName} \n${order.srcAddress.streetName} ${order.srcAddress.streetNumber} \n${order.srcAddress.zipCode} ${order.srcAddress.city}`, 110, 95);

        pdf.setFontSize(22);
        pdf.text('Bezahlinformation', 20, 125);
        pdf.line(20, 127, 190, 127);
        pdf.setFontSize(16);

        pdf.text('Zahlungsart:', 20, 135);
        pdf.setFontSize(16).setFont(pdf.getFont().fontName, 'bold');
        if (order.paymentMethod === 'PAYPAL') {
            pdf.text('Paypal', 20, 145);
        } else {
            pdf.text('Überweisung ', 20, 145);
        }
        pdf.setFontSize(16).setFont(pdf.getFont().fontName, 'normal');

        pdf.setFontSize(22);
        pdf.text('Paketübersicht', 20, 165);
        pdf.line(20, 167, 190, 167);
        pdf.setFontSize(10);
        pdf.text(`Sendungsverfolgungsnummer: ${deliveryId}`, 20, 172);
        pdf.setFontSize(16);
        pdf.text(`Gewicht:  ${pack.weight}kg \nHöhe:      ${pack.height}cm \nBreite:     ${pack.width}cm \nLänge:    ${pack.depth}cm \nStatus: Im System eingegangen`, 20, 180);


        pdf.setFontSize(22);
        pdf.text('Rechnungsübersicht', 20, 225);
        pdf.line(20, 227, 190, 227);
        pdf.setFontSize(16);
        if (order.isPickup) {
            pack.price = pack.price - 5;
            shippingCosts = 5;
        }
        pdf.text(`Paket                        ${pack.price}`, 20, 235);
        pdf.text(`Versandmethode       ${shippingCosts}`, 20, 243);
        // const bla = new Date(Date.UTC(2022, 11, 20, 16, 5));
        let germanDate = new Date();
        if (order.isPickup) {
            germanDate = new Date(Date.UTC(order.pickupDate.getFullYear(), order.pickupDate.getMonth(), order.pickupDate.getDay(), order.pickupDate.getHours() - 1, order.pickupDate.getMinutes()));
        }
        let abholungtext = (order.isPickup) ? `Abholung Zuhause ${germanDate.toLocaleDateString() + " " + germanDate.toLocaleTimeString()}` : 'Abgabe bei der Filiale';
        pdf.setFontSize(10);
        pdf.text(`(${abholungtext})`, 20, 247);
        pdf.setFontSize(16).setFont(pdf.getFont().fontName, 'bold');
        pdf.text(`Gesamtsumme         ${pack.price + shippingCosts}`, 20, 255);
        pdf.line(20, 249, 100, 249);
        pdf.setFontSize(10).setFont(pdf.getFont().fontName, 'normal');
        pdf.text('alle Angaben in Euro, inkl. MwSt', 20, 260);

        pdf.setFontSize(16);
        pdf.text('\nMit freundlichen Grüßen\n\nDein Trouvaille-Delivery Team\n', 20, 270);

        //pdf.save('test.pdf');

        var blob = pdf.output("blob");
        window.open(URL.createObjectURL(blob));
    }
}
