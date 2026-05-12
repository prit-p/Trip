export interface TripStop {
  name: string;
  description: string;
  activity?: string;
  time?: string;
  icon?: string;
  position: { lat: number; lng: number };
}

export interface TripDay {
  day: number;
  date: string;
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

export const TRANSCRIPT_DATA = [
  {
    role: "User",
    text: "Plan me a trip to Michigan and neighborhood areas. Details: First day reach Ann Arbor. Total 2night3Days trip from Ann Arbor then. We plan to drive to Mackinac Island and then to Pictured Rocks and then back to Ann Arbor and then on Day 5 back to our own places. Design a trip like a car trip and local areas in between and on the way."
  },
  {
    role: "Assistant",
    text: "I've mapped out the driving times: Ann Arbor to Mackinaw City (about 4 hours), Mackinaw City to Munising (roughly 2.25 hours), and Munising back to Ann Arbor (around 6.5 hours). Day 1 arrival, Day 2 AA -> Mackinac (1 night), Day 3 Mackinac -> Munising (1 night), Day 4 Munising -> AA (1 night in AA), Day 5 departure."
  },
  {
    role: "User",
    text: "I want the road trip to be scenic. Design the route likewise. Won't mind a couple of extra hours for that. On the final day include some places in Ann Arbor as well. We will leave for our home the next day."
  },
  {
    role: "Assistant",
    text: "This revised itinerary prioritizes the scenic byways. Instead of I-75, you will hug the coastlines. Day 2 uses M-119 'Tunnel of Trees'. Day 3 uses US-2 'Top of the Lake'. Day 4 returns via the US-23 'Sunrise Coast'. Day 5 includes Huron River kayaking and a detour to charming Chelsea."
  }
];

export const FULL_PLAN_TEXT = `
### **Michigan Scenic Road Trip: The 5-Day Loop**

This itinerary prioritizes the **scenic byways** of Michigan. Instead of taking the inland highway (I-75) the whole way, you will hug the coastlines of Lake Michigan and Lake Huron.

---

### **Day 1: Friday, June 19 - Arrival & Ann Arbor’s "Hidden" Nature**
*   **Arrival:** Settle into Ann Arbor.
*   **Afternoon:** Visit **Matthaei Botanical Gardens**. It offers beautiful Conservatory views and scenic trails. 
*   **The Neighborhood Walk:** Head to the **Old West Side**. It’s a historic neighborhood with beautiful 19th-century homes and massive oak trees. Walk to **Blank Slate Creamery** for local ice cream.
*   **Dinner:** **Gandy Dancer**. Located in the historic 1886 Michigan Central Railroad Depot.

---

### **Day 2: Saturday, June 20 - The "Tunnel of Trees" Route**
*   **Morning:** Leave AA early and head toward **Harbor Springs**. 
*   **The Scenic Drive (M-119):** From Harbor Springs to Cross Village, drive the **"Tunnel of Trees."** This is one of the most famous scenic roads in the USA.
*   **Stop – Good Hart:** Stop at the **Good Hart General Store** (built in 1934) for a pot pie or a snack.
*   **Stop – Legs Inn:** In Cross Village, see this famous stone landmark with unconventional architecture and great lake views.
*   **Evening:** Reach Mackinaw City, take the ferry to **Mackinac Island**. 

---

### **Day 3: Sunday, June 21 - The "Top of the Lake" Drive**
*   **Morning:** Rent a bike on Mackinac Island. Bike the **8-mile loop around the island (M-185)**—it’s the only highway in America where cars are banned.
*   **Afternoon Drive (US-2):** Cross the bridge into the Upper Peninsula (UP). Take **US-2 West** toward Manistique. This road hugs the **Northern Shore of Lake Michigan**.
*   **The Scenic Detour:** Visit **Kitch-iti-kipi (The Big Spring)**. You board a self-propelled observation raft to see trout through emerald green water 40 feet deep.
*   **Evening:** Arrive in **Munising**. Catch the sunset at **Sand Point Beach**.

---

### **Day 4: Monday, June 22 - Pictured Rocks & The "Sunrise Coast" Return**
*   **Morning:** Do a **Pictured Rocks Kayak Tour** or the **Morning Cruise**. Seeing the "Painted Coves" from the water is the highlight of the trip.
*   **Afternoon (The Drive Home):** Head east toward **Tahquamenon Falls State Park**. See the "Upper Falls"—the second-largest waterfall east of the Mississippi. 
*   **The Scenic Return (US-23):** Cross back over the Mackinac Bridge. Take **US-23 South** along the **Lake Huron "Sunrise Coast."**
*   **Late Night:** Return to Ann Arbor.

---

### **Day 5: Tuesday, June 23 - Ann Arbor Neighborhoods & River Views**
*   **Morning:** **Canoe or Kayak the Huron River**. Go to **Argo Park Livery**. You can paddle through the "Argo Cascades" and down to the Arb. 
*   **Lunch:** Visit the **Kerrytown District**. Eat at **Monahan’s Seafood** or the **Zingerman's** deli.
*   **Afternoon Detour:** Drive 20 minutes west to the village of **Chelsea**. Quintessential Michigan small-town downtown.
*   **Evening:** Return to Ann Arbor for a final "Townie" dinner at **The Earle** or **Frita Batidos**.
`;

export const TRIP_DATA: TripDay[] = [
  {
    day: 1,
    date: "Friday, June 19",
    title: "Arrival & Hidden Nature",
    subtitle: "Ann Arbor Neighborhoods",
    highlights: ["Matthaei Botanical Gardens", "Old West Side", "Blank Slate Creamery"],
    stops: [
      {
        name: "Matthaei Botanical Gardens",
        description: "Explore conservatory views and scenic trails 10 minutes from downtown.",
        icon: "Trees",
        position: { lat: 42.3005, lng: -83.6631 }
      },
      {
        name: "Kerrytown District",
        description: "Historic neighborhood with farmers market and artisan shops.",
        icon: "ShoppingBag",
        position: { lat: 42.2848, lng: -83.7479 }
      },
      {
        name: "Old West Side",
        description: "Walk past 19th-century homes and massive oak trees.",
        icon: "MapPin",
        position: { lat: 42.2762, lng: -83.7550 }
      }
    ],
    evening: {
      description: "Dinner at Gandy Dancer, set in a historic 1886 railroad depot.",
      stay: "Ann Arbor"
    }
  },
  {
    day: 2,
    date: "Saturday, June 20",
    title: "The Tunnel of Trees",
    subtitle: "Coastline of Lake Michigan",
    driveTime: "~6 hours",
    distance: "~300 miles",
    highlights: ["M-119 Tunnel of Trees", "Legs Inn", "Mackinac Island Ferry"],
    stops: [
      {
        name: "Harbor Springs",
        description: "Charming coastal town where the M-119 route begins.",
        icon: "Anchor",
        position: { lat: 45.4301, lng: -84.9902 }
      },
      {
        name: "M-119 Tunnel of Trees",
        description: "A narrow winding road draped in a dense canopy overlooking Lake Michigan.",
        icon: "Trees",
        position: { lat: 45.5262, lng: -85.0838 }
      },
      {
        name: "Good Hart General Store",
        description: "Step back in time at this 1934 store for a quick pot pie.",
        icon: "Store",
        position: { lat: 45.5264, lng: -85.0839 }
      },
      {
        name: "Legs Inn (Cross Village)",
        description: "Famous stone landmark with eccentric architecture.",
        icon: "Utensils",
        position: { lat: 45.6472, lng: -85.0317 }
      }
    ],
    evening: {
      description: "Catch the ferry to Mackinac Island as the sun starts to set.",
      stay: "Mackinac Island (Overnight recommended)"
    }
  },
  {
    day: 3,
    date: "Sunday, June 21",
    title: "Top of the Lake",
    subtitle: "Into the Upper Peninsula",
    driveTime: "~3.5 hours",
    distance: "~150 miles",
    highlights: ["Mackinac Island Loop", "US-2 Shoreline", "Kitch-iti-kipi"],
    stops: [
      {
        name: "Mackinac Island Perimeter",
        description: "8-mile bike loop (M-185) with zero cars allowed.",
        icon: "Bike",
        position: { lat: 45.8492, lng: -84.6189 }
      },
      {
        name: "Mackinac Bridge",
        description: "Iconic 5-mile crossing connecting Michigan's two peninsulas.",
        icon: "Milestone",
        position: { lat: 45.8174, lng: -84.7278 }
      },
      {
        name: "US-2 West",
        description: "Drives along white sand dunes and endless blue water.",
        icon: "Waves",
        position: { lat: 45.8500, lng: -85.2000 }
      },
      {
        name: "Kitch-iti-kipi",
        description: "The Big Spring: manual raft over 40ft deep emerald water.",
        icon: "Waves",
        position: { lat: 46.0039, lng: -86.3861 }
      }
    ],
    evening: {
      description: "Sunset at Sand Point Beach overlooking Pictured Rocks cliffs.",
      stay: "Munising"
    }
  },
  {
    day: 4,
    date: "Monday, June 22",
    title: "Painted Cliffs & Sunrise Coast",
    subtitle: "Superior Views & The Drive South",
    driveTime: "~7 hours",
    distance: "~400 miles",
    highlights: ["Pictured Rocks Cruise", "Tahquamenon Falls", "US-23 Sunrise Coast"],
    stops: [
      {
        name: "Pictured Rocks Boat Tour",
        description: "The only way to see the 200ft colorful sandstone cliffs properly.",
        icon: "Ship",
        position: { lat: 46.4381, lng: -86.5939 }
      },
      {
        name: "Tahquamenon Falls",
        description: "The second largest waterfall east of the Mississippi, famous for its amber color.",
        icon: "Zap",
        position: { lat: 46.5772, lng: -85.2044 }
      },
      {
        name: "US-23 Sunrise Coast",
        description: "Scenic return route along the Lake Huron shoreline.",
        icon: "Sun",
        position: { lat: 45.0617, lng: -83.4328 }
      }
    ],
    evening: {
      description: "Return late to Ann Arbor for one last night in the college town.",
      stay: "Ann Arbor"
    }
  },
  {
    day: 5,
    date: "Tuesday, June 23",
    title: "River Views & Small Towns",
    subtitle: "Ann Arbor Final Day",
    highlights: ["Huron River Kayaking", "Argo Cascades", "Chelsea Detour"],
    stops: [
      {
        name: "Huron River / Argo Cascades",
        description: "Canoe or kayak through the most scenic part of the city.",
        icon: "Waves",
        position: { lat: 42.2891, lng: -83.7371 }
      },
      {
        name: "Downtown Chelsea",
        description: "20-minute drive to a quintessential charming small town.",
        icon: "MapPin",
        position: { lat: 42.3181, lng: -84.0206 }
      }
    ],
    evening: {
      description: "Final 'Townie' dinner at The Earle (jazz) or Frita Batidos (Cuban).",
      stay: "Ann Arbor (Departure Tomorrow)"
    }
  }
];
