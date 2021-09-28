export default {
    addDays: function (date, days)
    {
        var d = date;
        return new Date(d.setDate(d.getDate() + days));
    },
    addMinutes: function (date, minutes) {
        var d = date;
        return d.setMinutes(d.getMinutes() + minutes);
    }
}
