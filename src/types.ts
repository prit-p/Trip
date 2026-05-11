export interface TripStop {
  name: string;
  description: string;
  activity?: string;
  time?: string;
  icon?: string;
}

export interface TripDay {
  day: number;
  title: string;
  subtitle: string;
  driveTime?: string;
  distance?: string;
  highlights: string[];
  stops: TripStop[];
  evening: {
    description: string;
    stay: string;
  };
}

export const TRIP_DATA: TripDay[] = [
  {
    day: 1,
    title: "Arrival & Hidden Nature",
    subtitle: "Ann Arbor Neighborhoods",
    highlights: ["Matthaei Botanical Gardens", "Old West Side", "Blank Slate Creamery"],
    stops: [
      {
        name: "Matthaei Botanical Gardens",
        description: "Explore conservatory views and scenic trails 10 minutes from downtown.",
        icon: "Trees"
      },
      {
        name: "Kerrytown District",
        description: "Historic neighborhood with farmers market and artisan shops.",
        icon: "ShoppingBag"
      },
      {
        name: "Old West Side",
        description: "Walk past 19th-century homes and massive oak trees.",
        icon: "MapPin"
      }
    ],
    evening: {
      description: "Dinner at Gandy Dancer, set in a historic 1886 railroad depot.",
      stay: "Ann Arbor"
    }
  },
  {
    day: 2,
    title: "The Tunnel of Trees",
    subtitle: "Coastline of Lake Michigan",
    driveTime: "~6 hours",
    distance: "~300 miles",
    highlights: ["M-119 Tunnel of Trees", "Legs Inn", "Mackinac Island Ferry"],
    stops: [
      {
        name: "Harbor Springs",
        description: "Charming coastal town where the M-119 route begins.",
        icon: "Anchor"
      },
      {
        name: "M-119 Tunnel of Trees",
        description: "A narrow winding road draped in a dense canopy overlooking Lake Michigan.",
        icon: "Trees"
      },
      {
        name: "Good Hart General Store",
        description: "Step back in time at this 1934 store for a quick pot pie.",
        icon: "Store"
      },
      {
        name: "Legs Inn (Cross Village)",
        description: "Famous stone landmark with eccentric architecture.",
        icon: "Utensils"
      }
    ],
    evening: {
      description: "Catch the ferry to Mackinac Island as the sun starts to set.",
      stay: "Mackinac Island (Overnight recommended)"
    }
  },
  {
    day: 3,
    title: "Top of the Lake",
    subtitle: "Into the Upper Peninsula",
    driveTime: "~3.5 hours",
    distance: "~150 miles",
    highlights: ["Mackinac Island Loop", "US-2 Shoreline", "Kitch-iti-kipi"],
    stops: [
      {
        name: "Mackinac Island Perimeter",
        description: "8-mile bike loop (M-185) with zero cars allowed.",
        icon: "Bike"
      },
      {
        name: "Mackinac Bridge",
        description: "Iconic 5-mile crossing connecting Michigan's two peninsulas.",
        icon: "Milestone"
      },
      {
        name: "US-2 West",
        description: "Drives along white sand dunes and endless blue water.",
        icon: "Waves"
      },
      {
        name: "Kitch-iti-kipi",
        description: "The Big Spring: manual raft over 40ft deep emerald water.",
        icon: "Waves"
      }
    ],
    evening: {
      description: "Sunset at Sand Point Beach overlooking Pictured Rocks cliffs.",
      stay: "Munising"
    }
  },
  {
    day: 4,
    title: "Painted Cliffs & Sunrise Coast",
    subtitle: "Superior Views & The Drive South",
    driveTime: "~7 hours",
    distance: "~400 miles",
    highlights: ["Pictured Rocks Cruise", "Tahquamenon Falls", "US-23 Sunrise Coast"],
    stops: [
      {
        name: "Pictured Rocks Boat Tour",
        description: "The only way to see the 200ft colorful sandstone cliffs properly.",
        icon: "Ship"
      },
      {
        name: "Tahquamenon Falls",
        description: "The second largest waterfall east of the Mississippi, famous for its amber color.",
        icon: "Zap"
      },
      {
        name: "US-23 Sunrise Coast",
        description: "Scenic return route along the Lake Huron shoreline.",
        icon: "Sun"
      }
    ],
    evening: {
      description: "Return late to Ann Arbor for one last night in the college town.",
      stay: "Ann Arbor"
    }
  },
  {
    day: 5,
    title: "River Views & Small Towns",
    subtitle: "Ann Arbor Final Day",
    highlights: ["Huron River Kayaking", "Argo Cascades", "Chelsea Detour"],
    stops: [
      {
        name: "Huron River / Argo Cascades",
        description: "Canoe or kayak through the most scenic part of the city.",
        icon: "Waves"
      },
      {
        name: "Downtown Chelsea",
        description: "20-minute drive to a quintessential charming small town.",
        icon: "MapPin"
      }
    ],
    evening: {
      description: "Final 'Townie' dinner at The Earle (jazz) or Frita Batidos (Cuban).",
      stay: "Ann Arbor (Departure Tomorrow)"
    }
  }
];
