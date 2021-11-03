export const calculateTimeLeft = (appointmentDate = '0') =>
  Number(
    (
      new Date(appointmentDate).getTime() / 1000 -
      new Date().getTime() / 1000
    ).toFixed(0),
  )
