module.exports = [
  {
    stationShortCode: "HKI",
    stationUICCode: 1,
    countryCode: "FI",
    type: "DEPARTURE",
    trainStopping: true,
    commercialStop: true,
    commercialTrack: "7",
    cancelled: false,
    scheduledTime: "2019-02-07T04:57:00.000Z",
    actualTime: "2019-02-07T05:09:15.000Z",
    differenceInMinutes: 12,
    causes: [
      {
        categoryCode: "K",
        detailedCategoryCode: "K1",
        categoryCodeId: 23,
        detailedCategoryCodeId: 85
      }
    ],
    trainReady: {
      source: "KUPLA",
      accepted: true,
      timestamp: "2019-02-07T05:02:34.000Z"
    }
  },
  {
    stationShortCode: "PSL",
    stationUICCode: 10,
    countryCode: "FI",
    type: "ARRIVAL",
    trainStopping: true,
    commercialStop: true,
    commercialTrack: "4",
    cancelled: false,
    scheduledTime: "2019-02-07T05:02:00.000Z",
    actualTime: "2019-02-07T05:13:53.000Z",
    differenceInMinutes: 12,
    causes: []
  },
  {
    stationShortCode: "PSL",
    stationUICCode: 10,
    countryCode: "FI",
    type: "DEPARTURE",
    trainStopping: true,
    commercialStop: true,
    commercialTrack: "4",
    cancelled: false,
    scheduledTime: "2019-02-07T05:03:00.000Z",
    actualTime: "2019-02-07T05:16:09.000Z",
    differenceInMinutes: 13,
    causes: []
  },
  {
    stationShortCode: "KÄP",
    stationUICCode: 977,
    countryCode: "FI",
    type: "ARRIVAL",
    trainStopping: false,
    commercialTrack: "",
    cancelled: false,
    scheduledTime: "2019-02-07T05:05:00.000Z",
    actualTime: "2019-02-07T05:18:52.000Z",
    differenceInMinutes: 14,
    causes: []
  },
  {
    stationShortCode: "KÄP",
    stationUICCode: 977,
    countryCode: "FI",
    type: "DEPARTURE",
    trainStopping: false,
    commercialTrack: "",
    cancelled: false,
    scheduledTime: "2019-02-07T05:05:00.000Z",
    actualTime: "2019-02-07T05:18:52.000Z",
    differenceInMinutes: 14,
    causes: []
  }
];
