const DDD_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export class dateHelper {
  /**
   * Format the ISO date to any necessary format. Currently only "DDD"
   * (luxon-style long date, e.g. "October 14, 1983") is supported; other
   * formats fall back to the runtime's default locale formatting.
   */
  static formatISO(date: string, format: string) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    if (format === "DDD") return d.toLocaleDateString("en-US", DDD_FORMAT);
    return d.toLocaleDateString();
  }
}
