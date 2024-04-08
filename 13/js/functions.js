function isMeetingInWorkingHours(startWork, endWork, startMeeting, duration) {
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startWorkInMinutes = timeToMinutes(startWork);
  const endWorkInMinutes = timeToMinutes(endWork);
  const startMeetingInMinutes = timeToMinutes(startMeeting);
  const endMeetingInMinutes = startMeetingInMinutes + duration;

  return startMeetingInMinutes >= startWorkInMinutes && endMeetingInMinutes <= endWorkInMinutes;
}

isMeetingInWorkingHours('08:00', '17:30', '14:00', 90);
isMeetingInWorkingHours('8:0', '10:0', '8:0', 120);
isMeetingInWorkingHours('08:00', '14:30', '14:00', 90);
isMeetingInWorkingHours('14:00', '17:30', '08:0', 90);
isMeetingInWorkingHours('8:00', '17:30', '08:00', 900);
