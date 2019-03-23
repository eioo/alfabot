import CommandBase from 'bot/cmds/commandBase';
import * as dateFormat from 'dateformat';
import Bot from 'shared/types/bot';
import { getTrackingDetails, ShipmentPhases } from './tracking';

class PostiCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.helpText = 'Gets tracking information from Posti';
    this.helpArgs = '[tracking number]';
  }

  listen(): void {
    this.onText(/^\/posti/i, async msg => {
      const args = (msg.text || '').split(' ');

      if (!args[1]) {
        return this.showHelp(msg);
      }

      const trackingCode = args[1];
      const reply = await this.reply(msg, 'Haetaan lähetystä...');
      const tracking = await getTrackingDetails(trackingCode);

      if (!tracking.shipments.length) {
        return this.editReply(msg, 'Lähetystä ei löytynyt');
      }

      const shipment = tracking.shipments[0];

      this.editReply(
        reply,
        `*${trackingCode}*\n` +
          `Tila: ${ShipmentPhases[shipment.phase]}\n` +
          `Paino: ${shipment.weight || '-'} kg, ` +
          `Tilavuus: ${shipment.volume || '-'} m³`
      );

      const details = shipment.events.map(event => {
        const { locationName, timestamp, description } = event;

        const dateText = dateFormat(new Date(timestamp), 'dd-mm-yyyy HH:MM');
        const locationText = locationName ? ` (_${locationName})_ ` : '';

        return `*${dateText}*${locationText}${description.fi}`;
      });

      this.reply(msg, details);
    });
  }
}

export default PostiCommand;
