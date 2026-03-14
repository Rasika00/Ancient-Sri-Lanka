export interface HistoricalPlace {
  id: string;
  name: string;
  sinhalaName: string;
  description: string;
  culturalSignificance: string;
  coordinates: { lat: number; lng: number };
  color: string;
  symbol: string;
}

export const historicalPlaces: HistoricalPlace[] = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    sinhalaName: "සීගිරිය",
    description:
      "Sigiriya, the magnificent Lion Rock fortress, rises nearly 200 meters above the surrounding plains. Built by King Kashyapa I in the 5th century AD, this ancient palace complex features stunning frescoes of celestial maidens, the famous Mirror Wall, and the colossal Lion Gate. The summit once housed a royal palace with elaborate gardens, pools, and terraces — a testament to ancient engineering prowess.",
    culturalSignificance:
      "Designated a UNESCO World Heritage Site in 1982, Sigiriya represents one of the finest examples of ancient urban planning. The water gardens, boulder gardens, and terraced gardens showcase hydraulic engineering that was centuries ahead of its time. The Sigiriya frescoes are considered among the finest examples of ancient art in the world.",
    coordinates: { lat: 7.9456, lng: 80.7616 },
    color: "#C4A265",
    symbol: "☸",
  },
  {
    id: "pahiyangala",
    name: "Pahiyangala",
    sinhalaName: "පාහියන්ගල",
    description:
      "Pahiyangala, also known as Fa Hien Cave, is one of South Asia's most important prehistoric cave sites. Set within a massive natural rock shelter in Sri Lanka's wet zone, the site is associated with early human settlement and has yielded archaeological evidence dating back tens of thousands of years.",
    culturalSignificance:
      "The cave is named after the Chinese Buddhist monk Faxian, who is believed to have stayed here during his travels. Pahiyangala is especially significant because excavations uncovered some of the earliest evidence of anatomically modern humans in Sri Lanka, making it a major landmark in the island's archaeological and cultural history.",
    coordinates: { lat: 6.6493, lng: 80.2162 },
    color: "#7A8F6A",
    symbol: "◈",
  },
];
