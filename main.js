export async function getABDay(type) {
  let response = await fetch("https://calendar.google.com/calendar/ical/537on0svjl80bon1j075a8fep0%40group.calendar.google.com/public/basic.ics");
  let data = await response.text();
  if (type == 1) return data.replaceAll("\n", "<br>");
  let date = new Date().toISOString().slice(0, 10);
  date = date.replace(/-/g, "");
  let index = data.indexOf(`DTSTART;VALUE=DATE:${date}`);
  let eventStart = data.lastIndexOf("BEGIN:VEVENT", index);
  let eventEnd = data.indexOf("END:VEVENT", index) + "END:VEVENT".length;
  let eventData = data.substring(eventStart, eventEnd);
  let summary = eventData.match(/SUMMARY:(.*)/)[1];
  if (type == 0) return summary;
  /*let today =
    eventData.split("\n").reduce((acc, line) => {
      let [key, value] = line.split(":");
      if (value.endsWith("\r")) {
        value = value.slice(0, -1);
      }
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});*/
}
export async function getCalendar(type) {
  let response = await fetch("https://www.google.com/calendar/ical/howard.county.public.schools%40gmail.com/public/basic.ics");
  let data = await response.text();
  if (type == 1) return data.replaceAll("\n", "<br>");
  let date = new Date().toISOString().slice(0, 10);
  date = date.replace(/-/g, "");
  let day = "normal";
  let index = data.indexOf(`DTSTART;VALUE=DATE:${date}`);
  if (index >= 0) {
    let eventStart = data.lastIndexOf("BEGIN:VEVENT", index);
    let eventEnd = data.indexOf("END:VEVENT", index) + "END:VEVENT".length;
    let eventData = data.substring(eventStart, eventEnd);
    let summary = eventData.match(/SUMMARY:(.*)/)[1];

    if (summary.startsWith("3-hour early dismissal")) day = "half";
    if (summary.startsWith("Schools closed")) day = "none";
    if (summary.startsWith("Schools and offices closed")) day = "none";
    if (type == 0) return { summary, day };
  } else {
    if (type == 0) return { summary: "Normal operations", day: "normal" };
  }
}

export default async function getData() {
  let abDay = await getABDay(0);
  let calendar = await getCalendar(0);
  return { abDay, summary: calendar.summary, day: calendar.day };
}