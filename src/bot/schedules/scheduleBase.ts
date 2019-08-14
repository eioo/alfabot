abstract class ScheduleBase {
  abstract action(chatId: number): Promise<void> | void;
}

export default ScheduleBase;
