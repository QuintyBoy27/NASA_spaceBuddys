// Curated NASA records. Dates refer to the labeled event, not a common mission milestone.
const exhibits = [
  {
    "id": "eagle",
    "world": "Moon",
    "mission": "Apollo 11",
    "year": "1969",
    "name": "Eagle’s descent stage",
    "place": "Sea of Tranquility",
    "status": "Left at liftoff",
    "hook": "A launchpad that stayed on the Moon.",
    "story": "The crew landed in a two-part vehicle. When Armstrong and Aldrin lifted off, only the upper part rose. The lower stage stayed on its four legs, becoming the launch platform for the ride back to orbit.",
    "science": "The stage gave the astronauts a way to land, work on the surface and leave. Their visit made it possible to gather lunar rocks for study on Earth.",
    "evidence": "Decades later, Lunar Reconnaissance Orbiter images show the descent stage and trails left by the crew.",
    "sourceName": "Apollo 11 landing site",
    "source": "https://science.nasa.gov/resource/apollo-11-landing-site/",
    "credit": "NASA/GSFC/Arizona State University",
    "dateLabel": "Lunar landing",
    "date": "1969-07-20",
    "facts": [
      [
        "Landing",
        "20 July 1969"
      ],
      [
        "Returned samples",
        "About 21.5 kg"
      ],
      [
        "Crew on surface",
        "Armstrong & Aldrin"
      ]
    ],
    "references": [
      {
        "title": "Apollo 11 landing site from dawn to dusk",
        "url": "https://science.nasa.gov/resource/apollo-11-landing-site-from-dawn-to-dusk/"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "rover",
    "world": "Moon",
    "mission": "Apollo 15",
    "year": "1971",
    "name": "Lunar Roving Vehicle",
    "place": "Hadley–Apennine",
    "status": "Parked after use",
    "hook": "The first wheels on the Moon.",
    "story": "David Scott and James Irwin drove to geological sites farther from the lander than they could easily have reached on foot. At the end of the last moonwalk, Scott parked the rover away from the lunar module.",
    "science": "The rover helped the crew reach several sampling areas in a single moonwalk and carry tools and rocks back to the lander.",
    "evidence": "Orbital context image of the Apollo 15 landing region and traverse routes. The rover is too small to identify in this overview; this is not a close-up photograph of the vehicle.",
    "sourceName": "Apollo by the Numbers · Apollo 15",
    "source": "https://www.nasa.gov/wp-content/uploads/2023/04/sp-4029.pdf",
    "credit": "NASA/GSFC/Arizona State University",
    "dateLabel": "Surface arrival",
    "date": "1971-07-30",
    "facts": [
      [
        "Apollo 15 traverse",
        "27.8 km"
      ],
      [
        "Vehicle mass",
        "210 kg"
      ],
      [
        "Electrical supply",
        "Two 36 V batteries"
      ]
    ],
    "references": [
      {
        "title": "NSSDCA · Lunar Roving Vehicle",
        "url": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "alsep",
    "world": "Moon",
    "mission": "Apollo 17",
    "year": "1972",
    "name": "Lunar experiments station",
    "place": "Taurus–Littrow",
    "status": "Decommissioned in 1977",
    "hook": "An experiment that outlasted the visit.",
    "story": "The crew set up instruments around a central station so measurements could continue after the astronauts went home. The instruments included a heat-flow experiment and a seismic profiling experiment.",
    "science": "Heat-flow measurements help scientists investigate how the Moon loses internal heat. Seismic measurements use vibrations to study what lies under the surface.",
    "evidence": "The station was switched off in 1977. NASA’s annotated orbital image marks the experiment package near the landing site.",
    "sourceName": "Apollo 17 site · Annotated orbital image",
    "source": "https://science.nasa.gov/image-article/apod-2011-september-8-apollo-17-site-a-sharper-view/",
    "credit": "NASA/GSFC/Arizona State University",
    "extra": "https://ntrs.nasa.gov/citations/19790014808",
    "dateLabel": "Deployment year",
    "date": "1972",
    "facts": [
      [
        "Deployment",
        "December 1972"
      ],
      [
        "Commanded off",
        "30 September 1977"
      ],
      [
        "Measurements",
        "Heat flow & seismic profiling"
      ]
    ],
    "references": [
      {
        "title": "NASA · ALSEP arrays and status",
        "url": "https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "shield",
    "world": "Mars",
    "mission": "Mars Exploration Rover",
    "year": "2004",
    "name": "Opportunity’s heat shield",
    "place": "Meridiani Planum",
    "status": "Jettisoned during descent",
    "hook": "A shield built to take the heat.",
    "story": "As Opportunity entered Mars’s atmosphere, its heat shield protected the spacecraft from intense heating. The shield was released before the rover reached the ground.",
    "science": "Surviving entry let Opportunity reach the surface and investigate rocks for evidence of Mars’s watery past. Later, the rover visited its own heat-shield wreckage and documented what survived.",
    "evidence": "On Jan. 2, 2005, the rover’s panoramic camera photographed the shield remains from the Martian surface.",
    "sourceName": "Opportunity’s Heat Shield in Color, Sol 335",
    "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/",
    "credit": "NASA/JPL/Cornell",
    "dateLabel": "Rover landing",
    "date": "2004-01-25",
    "facts": [
      [
        "Rover landing",
        "25 January 2004 (UTC)"
      ],
      [
        "Shield photograph",
        "2 January 2005"
      ],
      [
        "Nearby discovery",
        "Iron-nickel meteorite"
      ]
    ],
    "references": [
      {
        "title": "NASA · Spirit and Opportunity science",
        "url": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "backshell",
    "world": "Mars",
    "mission": "Mars 2020",
    "year": "2021",
    "name": "Perseverance’s landing gear",
    "place": "Jezero Crater",
    "status": "Separated before touchdown",
    "hook": "The parachute that delivered a rover.",
    "story": "Perseverance rode through part of the descent under a supersonic parachute attached to its backshell. The rover and rocket-powered descent stage then separated from the backshell to finish the landing.",
    "science": "The landing system delivered a rover built to search for signs of ancient microbial life and collect samples. Later photos gave engineers a look at the hardware after impact.",
    "evidence": "Ingenuity photographed the backshell and parachute from about eight meters above the surface on April 19, 2022.",
    "sourceName": "Rover Landing Gear Seen From the Air",
    "source": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/",
    "credit": "NASA/JPL-Caltech",
    "dateLabel": "Landing-system arrival",
    "date": "2021-02-18",
    "facts": [
      [
        "Rover landing",
        "18 February 2021"
      ],
      [
        "Aerial photograph",
        "19 April 2022"
      ],
      [
        "Camera altitude",
        "About 8 m"
      ]
    ],
    "references": [
      {
        "title": "NASA Photojournal · PIA25217",
        "url": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "ingenuity",
    "world": "Mars",
    "mission": "Mars 2020",
    "year": "2024",
    "name": "Ingenuity helicopter",
    "place": "Valinor Hills · Jezero Crater",
    "status": "Flight ended after rotor damage",
    "hook": "The helicopter that flew 72 times.",
    "story": "Ingenuity went to Mars to see if powered, controlled flight was possible in its thin atmosphere. After its test flights, it scouted terrain for Perseverance. It damaged its rotor blades during the landing of flight 72.",
    "science": "Ingenuity showed that a flying robot can survey terrain from above and help a rover team plan where to go.",
    "evidence": "Perseverance photographed the helicopter at its final airfield on Feb. 4, 2024. NASA assembled six frames into the enhanced-color mosaic.",
    "sourceName": "Perseverance Spots Ingenuity at Its Final Airfield",
    "source": "https://science.nasa.gov/resource/perseverance-spots-ingenuity-at-its-final-airfield/",
    "credit": "NASA/JPL-Caltech/ASU/MSSS",
    "dateLabel": "Final flight",
    "date": "2024-01-18",
    "facts": [
      [
        "First powered flight",
        "19 April 2021"
      ],
      [
        "Final flight",
        "18 January 2024"
      ],
      [
        "Flights completed",
        "72 (five planned)"
      ]
    ],
    "references": [
      {
        "title": "NASA · Ingenuity mission",
        "url": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
      }
    ],
    "researched": "2026-11-14"
  }
];

exhibits.push(...[
  {
    "id": "surveyor",
    "world": "Moon",
    "mission": "Surveyor 3",
    "year": "1967",
    "date": "1967-04-20",
    "name": "Surveyor 3 lander",
    "place": "Oceanus Procellarum",
    "status": "Inactive; some parts returned by Apollo 12",
    "hook": "A robot visited by astronauts.",
    "story": "Surveyor 3 touched down in April 1967. Its scoop dug trenches and tested the ground before crewed landings. Apollo 12 astronauts later visited and brought selected components home.",
    "science": "Surface tests helped establish that the soil could support an Apollo lunar module. Returned hardware let researchers study exposure to the lunar environment.",
    "facts": [
      [
        "Landed",
        "20 April 1967"
      ],
      [
        "Last contact",
        "4 May 1967"
      ],
      [
        "Surface pictures",
        "6,326"
      ]
    ],
    "image": "moon",
    "dateLabel": "Surface landing",
    "evidence": "NASA Clementine near-side lunar mosaic. This is world context, not a photograph of Surveyor 3.",
    "credit": "NASA/JPL/USGS",
    "sourceName": "NASA mission history",
    "source": "https://science.nasa.gov/mission/surveyor-3/",
    "references": [
      {
        "title": "NASA · Surveyor 3",
        "url": "https://science.nasa.gov/mission/surveyor-3/"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "viking",
    "world": "Mars",
    "mission": "Viking 1",
    "year": "1976",
    "date": "1976-07-20",
    "name": "Viking 1 lander",
    "place": "Chryse Planitia",
    "status": "Communications ended in 1982",
    "hook": "A laboratory that made Mars a place.",
    "story": "Viking 1 combined an orbiter with a stationary laboratory. After touchdown, cameras, a sampling arm and scientific instruments investigated the landing site.",
    "science": "The lander studied soil and weather. Its biology experiments did not establish that Mars had life; interpreting the results required considering the chemistry of the soil.",
    "facts": [
      [
        "Landed",
        "20 July 1976"
      ],
      [
        "Operations ended",
        "11 November 1982"
      ],
      [
        "Power",
        "Two radioisotope generators"
      ]
    ],
    "image": "mars",
    "dateLabel": "Surface landing",
    "evidence": "NASA global view of Mars. This is world context, not a photograph of this spacecraft or its landing site.",
    "credit": "NASA/JPL-Caltech",
    "sourceName": "NASA mission history",
    "source": "https://science.nasa.gov/mission/viking-1/",
    "references": [
      {
        "title": "NASA · Viking 1",
        "url": "https://science.nasa.gov/mission/viking-1/"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "pathfinder",
    "world": "Mars",
    "mission": "Mars Pathfinder",
    "year": "1997",
    "date": "1997-07-04",
    "name": "Pathfinder & Sojourner",
    "place": "Ares Vallis",
    "status": "Final transmission in September 1997",
    "hook": "An airbag landing. A new era of wheels.",
    "story": "Pathfinder delivered a lander and the small Sojourner rover. A parachute and inflated airbags cushioned arrival, allowing a compact mobile scientist to begin investigating Mars.",
    "science": "The instruments examined rocks, soil and weather. Results supported a picture of a warmer, wetter ancient Mars, while engineering data helped demonstrate a new approach to exploration.",
    "facts": [
      [
        "Landed",
        "4 July 1997"
      ],
      [
        "Sojourner mass",
        "10.6 kg"
      ],
      [
        "Final transmission",
        "27 September 1997"
      ]
    ],
    "image": "mars",
    "dateLabel": "Surface landing",
    "evidence": "NASA global view of Mars. This is world context, not a photograph of this spacecraft or its landing site.",
    "credit": "NASA/JPL-Caltech",
    "sourceName": "NASA mission history",
    "source": "https://science.nasa.gov/mission/mars-pathfinder/",
    "references": [
      {
        "title": "NASA · Mars Pathfinder",
        "url": "https://science.nasa.gov/mission/mars-pathfinder/"
      }
    ],
    "researched": "2026-11-14"
  },
  {
    "id": "insight",
    "world": "Mars",
    "mission": "InSight",
    "year": "2018",
    "date": "2018-11-26",
    "name": "InSight lander",
    "place": "Elysium Planitia",
    "status": "Mission ended in 2022",
    "hook": "A quiet explorer listened beneath the dust.",
    "story": "InSight landed on a smooth plain chosen for safety. Its robotic arm placed scientific instruments on the surface so researchers could investigate the planet beneath its visible landscape.",
    "science": "Seismic observations helped scientists investigate the crust, mantle and core. A world can reveal its internal structure through vibrations, even when the spacecraft never drives anywhere.",
    "facts": [
      [
        "Landed",
        "26 November 2018"
      ],
      [
        "Robotic arm",
        "About 1.8 m"
      ],
      [
        "Study target",
        "The Martian interior"
      ]
    ],
    "image": "mars",
    "dateLabel": "Surface landing",
    "evidence": "NASA global view of Mars. This is world context, not a photograph of this spacecraft or its landing site.",
    "credit": "NASA/JPL-Caltech",
    "sourceName": "NASA mission history",
    "source": "https://science.nasa.gov/mission/insight/",
    "references": [
      {
        "title": "NASA · InSight",
        "url": "https://science.nasa.gov/mission/insight/"
      }
    ],
    "researched": "2026-11-14"
  }
]);
exhibits.sort((a,b)=>Number(a.year)-Number(b.year));

function missionFacts(record) {
 return `<dl class="mission-facts">${record.facts.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
}
function missionReferences(record) {
 return record.references.map(ref=>`<a href="${ref.url}" target="_blank" rel="noopener">${ref.title} ↗</a>`).join('<br>');
}

// Supplied research pathways, with access limitations.
const researchResources = [
  {
    "title": "NSSDCA archive",
    "url": "https://nssdc.gsfc.nasa.gov/",
    "description": "Space-science mission archive.",
    "status": "Reviewed",
    "group": "Moon & archives"
  },
  {
    "title": "Catalog 1969-059C",
    "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
    "description": "XML response unsupported by research browser; contents unverified.",
    "status": "Contents unverified",
    "group": "Moon & archives"
  },
  {
    "title": "Catalog 1971-063C",
    "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
    "description": "XML response unsupported by research browser; contents unverified.",
    "status": "Contents unverified",
    "group": "Moon & archives"
  },
  {
    "title": "Catalog 1969-099C",
    "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
    "description": "XML response unsupported by research browser; contents unverified.",
    "status": "Contents unverified",
    "group": "Moon & archives"
  },
  {
    "title": "Surveyor 3",
    "url": "https://science.nasa.gov/mission/surveyor-3/",
    "description": "Moon landing: 20 April 1967. Last contact: 4 May 1967.",
    "status": "Reviewed",
    "group": "Moon & archives"
  },
  {
    "title": "Mars Pathfinder",
    "url": "https://science.nasa.gov/mission/mars-pathfinder/",
    "description": "Landed in Ares Vallis on 4 July 1997. Mission ended on 27 September 1997.",
    "status": "Reviewed",
    "group": "Mars missions"
  },
  {
    "title": "Spirit and Opportunity",
    "url": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    "description": "Twin robotic geologists investigated ancient water through the Martian rock record.",
    "status": "Reviewed",
    "group": "Mars missions"
  },
  {
    "title": "Viking 1",
    "url": "https://science.nasa.gov/mission/viking-1/",
    "description": "Landed on 20 July 1976. The lander stopped operating on 11 November 1982.",
    "status": "Reviewed",
    "group": "Mars missions"
  },
  {
    "title": "InSight",
    "url": "https://science.nasa.gov/mission/insight/",
    "description": "A Mars lander dedicated to studying the planet’s interior.",
    "status": "Reviewed",
    "group": "Mars missions"
  },
  {
    "title": "Dawn",
    "url": "https://science.nasa.gov/mission/dawn/",
    "description": "Exploration of Vesta and Ceres; background beyond this Moon and Mars collection.",
    "status": "Reviewed",
    "group": "Beyond Moon & Mars"
  },
  {
    "title": "NEAR Shoemaker",
    "url": "https://science.nasa.gov/mission/near-shoemaker/",
    "description": "Asteroid mission. Last contact: 28 February 2001. Outside this collection’s scope.",
    "status": "Reviewed",
    "group": "Beyond Moon & Mars"
  },
  {
    "title": "Pioneer 10",
    "url": "https://science.nasa.gov/mission/pioneer-10/",
    "description": "Jupiter flyby pioneer. Last signal: January 2003. Not a Moon or Mars surface artifact.",
    "status": "Reviewed",
    "group": "Beyond Moon & Mars"
  },
  {
    "title": "Ingenuity",
    "url": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    "description": "72 flights on Mars. Final flight: 18 January 2024.",
    "status": "Reviewed",
    "group": "Mars missions"
  },
  {
    "title": "Kepler / K2",
    "url": "https://science.nasa.gov/mission/kepler/",
    "description": "Exoplanet observatory retired in October 2018. Outside this collection’s scope.",
    "status": "Reviewed",
    "group": "Beyond Moon & Mars"
  },
  {
    "title": "NASA Image and Video Library",
    "url": "https://images.nasa.gov/",
    "description": "JavaScript required. Existing exhibit photographs retain individual NASA credits.",
    "status": "JavaScript portal",
    "group": "Research tools"
  },
  {
    "title": "Planetary Data System",
    "url": "https://pds.nasa.gov/",
    "description": "Planetary science archive. A research pathway; this museum does not download raw PDS datasets.",
    "status": "Reviewed",
    "group": "Research tools"
  },
  {
    "title": "LROC image archive",
    "url": "https://lroc.im-ldi.com/images",
    "description": "Lunar imagery and maps from the LROC partner archive. Individual image credits remain with each exhibit.",
    "status": "Reviewed",
    "group": "Moon & archives"
  }
];
