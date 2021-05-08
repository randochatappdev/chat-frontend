let users = [
    { _id: "10002", alias: "Batman Warrior", gender: "Male", displayPicture: "https://picsum.photos/200" },
    { _id: "10074", alias: "Window Crusher", gender: "Female", displayPicture: "https://picsum.photos/200" },
    { _id: "10552", alias: "Sentient Flower", gender: "Male", displayPicture: "https://picsum.photos/200" },
    { _id: "19557", alias: "Bickering Star", gender: "Female", displayPicture: "https://picsum.photos/200" },
    { _id: "14552", alias: "Flamboyant Wrist", gender: "Female", displayPicture: "https://picsum.photos/200" },
    { _id: "19252", alias: "Lechong Manok", gender: "Unspecified", displayPicture: "https://picsum.photos/200" }
];

let topics = [
    { _id: "870000", name: "Japanese art", description: "Art from Japan" },
    { _id: "870001", name: "Belgian waffles", description: "Fun topics about Belgian waffles" },
    { _id: "870005", name: "American politics", description: "Topics about the diverse political mess that is the USA" },
    { _id: "870010", name: "Railways", description: "Topics about the worldwide train system" },
    { _id: "870000", name: "Haribo", description: "Topics about all kinds of Haribo candies" },
];

let rooms = [
    { _id: "250", name: "Contemporary Japanese Art Chat", topic: ['870000'], participants: ['10074', '19252', '14552'], description: "Chat for a community art group", administrator: "10074", groupDisplayPictureLink: "https://picsum.photos/200" },
    { _id: "450", name: "American Marxist Chat", topic: ['870005'], participants: ['10074', '19252', '10002'], description: "Chat for the American Marxist community", administrator: "10002", groupDisplayPictureLink: "https://picsum.photos/200" },
    { _id: "5500", participants: ['19252', '10002'] },
    { _id: "76", participants: ['19252', '14552'] },
    { _id: "01", participants: ['10002', '10552'] },
];

let messages = [
    { _id: "50000", sender: "19252", room: "450", content: { type: "text", body: "No, that's not true." }, timestamp: "1617017503146" },
    { _id: "50040", sender: "10074", room: "450", content: { type: "text", body: "Well, it actually is." }, timestamp: "1617017503149" },
    { _id: '008', sender: '19252', room: '76', content: { type: "text", body: "Yow, what's up." }, timestamp: "1617017503258" },
    { _id: '009', sender: '14552', room: '76', content: { type: "text", body: "I'm doing great." }, timestamp: "1617017503258" }

];

export { users, topics, rooms, messages }