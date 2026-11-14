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
// Shared research used by exhibits, diagrams and the built-in guide.
const missionResearch = {
  "surveyor": {
    "aliases": [
      "surveyor iii",
      "robotic lunar lander"
    ],
    "events": [
      {
        "date": "1967-04-17",
        "label": "Launch",
        "detail": "Surveyor 3 departed Earth.",
        "source": "https://science.nasa.gov/mission/surveyor-3/"
      },
      {
        "date": "1967-04-20",
        "label": "Landing",
        "detail": "It settled in Oceanus Procellarum.",
        "source": "https://science.nasa.gov/mission/surveyor-3/"
      },
      {
        "date": "1967-05-04",
        "label": "Last contact",
        "detail": "Contact ended after lunar night began.",
        "source": "https://science.nasa.gov/mission/surveyor-3/"
      },
      {
        "date": "1969-11",
        "label": "Human revisit",
        "detail": "Apollo 12 recovered selected components.",
        "source": "https://science.nasa.gov/mission/surveyor-3/"
      }
    ],
    "instruments": [
      {
        "name": "Surface sampler",
        "purpose": "Dug trenches and tested soil strength.",
        "source": "https://science.nasa.gov/mission/surveyor-3/"
      },
      {
        "name": "TV camera",
        "purpose": "Recorded the sampling site and surroundings.",
        "source": "https://science.nasa.gov/mission/surveyor-3/"
      }
    ],
    "related": [
      "eagle",
      "rover"
    ],
    "discovery": {
      "text": "Soil tests supported the feasibility of landing Apollo on the lunar surface.",
      "source": "https://science.nasa.gov/mission/surveyor-3/"
    },
    "finalOutcome": {
      "text": "Most of the lander remains; Apollo 12 returned its scoop, camera and other selected parts for study.",
      "source": "https://science.nasa.gov/mission/surveyor-3/"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/mission/surveyor-3/",
      "type": "Surface photograph",
      "alt": "Apollo 12 astronaut beside Surveyor 3, with the lunar module in the distance.",
      "width": 1280,
      "height": 1280,
      "original": "https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/07/as12-48-7134_1280.jpg"
    },
    "image": "surveyor",
    "evidence": "Apollo 12 photograph AS12-48-7134 shows an astronaut examining Surveyor 3, with the Apollo lunar module in the background.",
    "credit": "NASA",
    "researched": "2026-11-14",
    "glossary": [
      {
        "term": "Regolith",
        "definition": "Loose fragments of rock and dust covering a solid surface.",
        "source": "https://science.nasa.gov/moon/facts/"
      }
    ]
  },
  "eagle": {
    "aliases": [
      "apollo 11",
      "armstrong",
      "aldrin",
      "tranquility base"
    ],
    "events": [
      {
        "date": "1969-07-16",
        "label": "Launch",
        "detail": "Apollo 11 began its journey.",
        "source": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
      },
      {
        "date": "1969-07-20",
        "label": "Lunar landing",
        "detail": "Eagle landed with Armstrong and Aldrin.",
        "source": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
      },
      {
        "date": "1969-07-21",
        "label": "Surface departure",
        "detail": "The ascent stage lifted off; the descent stage stayed.",
        "source": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
      }
    ],
    "instruments": [
      {
        "name": "Descent propulsion and landing legs",
        "purpose": "Slowed and supported the lunar landing; these are engineering systems, not science instruments.",
        "source": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
      }
    ],
    "related": [
      "surveyor",
      "rover",
      "alsep"
    ],
    "discovery": {
      "text": "Returned samples brought the Moon into laboratories on Earth.",
      "source": "https://science.nasa.gov/resource/apollo-11-landing-site-from-dawn-to-dusk/"
    },
    "finalOutcome": {
      "text": "The lower stage was deliberately retained as the ascent stage’s launch platform.",
      "source": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/resource/apollo-11-landing-site/",
      "type": "Annotated orbital photograph",
      "alt": "Decades later, Lunar Reconnaissance Orbiter images show the descent stage and trails left by the crew.",
      "width": 1000,
      "height": 562
    },
    "researched": "2026-11-14",
    "glossary": [
      {
        "term": "Regolith",
        "definition": "Loose fragments of rock and dust covering a solid surface.",
        "source": "https://science.nasa.gov/moon/facts/"
      }
    ],
    "references": [
      {
        "title": "Apollo 11 landing site from dawn to dusk",
        "url": "https://science.nasa.gov/resource/apollo-11-landing-site-from-dawn-to-dusk/"
      },
      {
        "title": "NSSDCA · Apollo 11 Lunar Module / EASEP",
        "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
      }
    ]
  },
  "rover": {
    "aliases": [
      "lrv",
      "moon buggy",
      "apollo 15",
      "lunar vehicle"
    ],
    "events": [
      {
        "date": "1971-07-26",
        "label": "Launch",
        "detail": "Apollo 15 carried the folded rover.",
        "source": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C"
      },
      {
        "date": "1971-07-30",
        "label": "Surface arrival",
        "detail": "The lunar module delivered it to Hadley–Apennine.",
        "source": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C"
      },
      {
        "date": "1971",
        "label": "Surface traverses",
        "detail": "The crew drove 27.8 km in total.",
        "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"
      },
      {
        "date": "1971-08-02",
        "label": "Crew departure",
        "detail": "The rover stayed on the surface when the crew left.",
        "source": "https://www.nasa.gov/missions/apollo/apollo-15-mission-details/"
      }
    ],
    "instruments": [
      {
        "name": "Navigation gyro and odometer",
        "purpose": "Tracked direction and distance to help the crew return to the lander.",
        "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"
      },
      {
        "name": "Four electric wheel drives",
        "purpose": "Independent motors moved the rover over the surface.",
        "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"
      }
    ],
    "related": [
      "eagle",
      "pathfinder"
    ],
    "discovery": {
      "text": "Mobility increased the reach of geological fieldwork and sample collection.",
      "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"
    },
    "finalOutcome": {
      "text": "The rover was left on the Moon; it was designed for surface use, not return flight.",
      "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"
    },
    "imageMeta": {
      "source": "https://www.nasa.gov/wp-content/uploads/2023/04/sp-4029.pdf",
      "type": "Orbital context image",
      "alt": "Orbital context image of the Apollo 15 landing region and traverse routes. The rover is too small to identify in this overview; this is not a close-up photograph of the vehicle.",
      "width": 952,
      "height": 952
    },
    "researched": "2026-11-14",
    "glossary": [
      {
        "term": "Regolith",
        "definition": "Loose fragments of rock and dust covering a solid surface.",
        "source": "https://science.nasa.gov/moon/facts/"
      }
    ],
    "references": [
      {
        "title": "NSSDCA · Lunar Roving Vehicle",
        "url": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"
      },
      {
        "title": "NSSDCA · Apollo 15 Lunar Module / ALSEP",
        "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C"
      }
    ]
  },
  "alsep": {
    "aliases": [
      "apollo 17",
      "experiments",
      "lunar station"
    ],
    "events": [
      {
        "date": "1972-12-07",
        "label": "Launch",
        "detail": "Apollo 17 departed Earth.",
        "source": "https://www.nasa.gov/missions/apollo/apollo-17-mission-details/"
      },
      {
        "date": "1972-12-12",
        "label": "Deployment",
        "detail": "The crew installed the experiment station.",
        "source": "https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_17i_Timeline.htm"
      },
      {
        "date": "1977-09-30",
        "label": "Commanded off",
        "detail": "The surviving ALSEP network was shut down.",
        "source": "https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm"
      }
    ],
    "instruments": [
      {
        "name": "Heat-flow experiment",
        "purpose": "Investigated heat escaping from the lunar interior.",
        "source": "https://www.nasa.gov/missions/apollo/apollo-17-mission-details/"
      },
      {
        "name": "Lunar seismic profiling",
        "purpose": "Studied subsurface structure using ground vibrations.",
        "source": "https://www.nasa.gov/missions/apollo/apollo-17-mission-details/"
      }
    ],
    "related": [
      "insight",
      "eagle"
    ],
    "discovery": {
      "text": "The station continued scientific work years after the crew had returned.",
      "source": "https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm"
    },
    "finalOutcome": {
      "text": "The station was commanded off on 30 September 1977; its hardware remains.",
      "source": "https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/image-article/apod-2011-september-8-apollo-17-site-a-sharper-view/",
      "type": "Annotated orbital photograph",
      "alt": "The station was switched off in 1977. NASA’s annotated orbital image marks the experiment package near the landing site.",
      "width": 1280,
      "height": 960
    },
    "researched": "2026-11-14",
    "date": "1972-12-12",
    "dateLabel": "Experiment deployment",
    "facts": [
      [
        "Deployment",
        "12 December 1972"
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
    "glossary": [
      {
        "term": "Seismometer",
        "definition": "An instrument that measures tiny motions of the ground. Scientists use the resulting waves to investigate a planet’s interior.",
        "source": "https://science.nasa.gov/mission/insight/science-instruments/"
      }
    ]
  },
  "viking": {
    "aliases": [
      "viking 1",
      "viking i",
      "first mars lander"
    ],
    "events": [
      {
        "date": "1975-08-20",
        "label": "Launch",
        "detail": "An orbiter and lander departed together.",
        "source": "https://science.nasa.gov/mission/viking-1/"
      },
      {
        "date": "1976-07-20",
        "label": "Landing",
        "detail": "The lander reached Chryse Planitia.",
        "source": "https://science.nasa.gov/mission/viking-1/"
      },
      {
        "date": "1982-11-11",
        "label": "Communications ended",
        "detail": "A faulty command interrupted contact.",
        "source": "https://science.nasa.gov/mission/viking-1/"
      }
    ],
    "instruments": [
      {
        "name": "Biological laboratory",
        "purpose": "Tested soil responses; its results did not establish Martian life.",
        "source": "https://science.nasa.gov/mission/viking-1/"
      },
      {
        "name": "Weather instruments",
        "purpose": "Measured temperature, pressure and wind.",
        "source": "https://science.nasa.gov/mission/viking-1/"
      },
      {
        "name": "Cameras and sampling arm",
        "purpose": "Observed the site and supplied material to experiments.",
        "source": "https://science.nasa.gov/mission/viking-1/"
      }
    ],
    "related": [
      "pathfinder",
      "insight"
    ],
    "discovery": {
      "text": "Viking returned detailed surface imagery and extended weather observations.",
      "source": "https://science.nasa.gov/mission/viking-1/"
    },
    "finalOutcome": {
      "text": "Contact was lost in 1982 after a faulty command; the lander remains on Mars.",
      "source": "https://science.nasa.gov/mission/viking-1/"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/mission/viking-1/",
      "type": "Surface photograph",
      "alt": "Viking 1’s first black-and-white surface image shows rocks and a lander footpad.",
      "width": 1280,
      "height": 476,
      "original": "https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/07/Viking_1_First_Image_From_Mars_1280.jpg"
    },
    "image": "viking",
    "evidence": "Viking 1 returned this first surface photograph shortly after landing on 20 July 1976. It shows nearby ground and part of the lander.",
    "credit": "NASA/JPL",
    "researched": "2026-11-14",
    "glossary": [
      {
        "term": "Sol",
        "definition": "A Martian solar day, used to count days of surface operations.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "term": "Heat shield",
        "definition": "A protective part of the entry system that takes the effects of atmospheric heating.",
        "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/"
      }
    ]
  },
  "pathfinder": {
    "aliases": [
      "sojourner",
      "path finder",
      "carl sagan memorial station"
    ],
    "events": [
      {
        "date": "1996-12-04",
        "label": "Launch",
        "detail": "Pathfinder began its trip to Mars.",
        "source": "https://science.nasa.gov/mission/mars-pathfinder/"
      },
      {
        "date": "1997-07-04",
        "label": "Landing",
        "detail": "Airbags cushioned arrival at Ares Vallis.",
        "source": "https://science.nasa.gov/mission/mars-pathfinder/"
      },
      {
        "date": "1997-09-27",
        "label": "Final transmission",
        "detail": "The final data arrived from the mission.",
        "source": "https://science.nasa.gov/mission/mars-pathfinder/"
      }
    ],
    "instruments": [
      {
        "name": "Imager for Mars Pathfinder",
        "purpose": "Recorded the landing site and rover activities.",
        "source": "https://science.nasa.gov/mission/mars-pathfinder/"
      },
      {
        "name": "Rover composition measurements",
        "purpose": "Investigated the chemical makeup of rocks and soil.",
        "source": "https://science.nasa.gov/mission/mars-pathfinder/"
      }
    ],
    "related": [
      "rover",
      "shield",
      "viking"
    ],
    "discovery": {
      "text": "Rock, soil and weather observations supported a warmer, wetter ancient Mars.",
      "source": "https://science.nasa.gov/mission/mars-pathfinder/"
    },
    "finalOutcome": {
      "text": "The lander and Sojourner stopped returning data in September 1997 and remain at Ares Vallis.",
      "source": "https://science.nasa.gov/mission/mars-pathfinder/"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/mission/mars-pathfinder/",
      "type": "Processed panorama",
      "alt": "Sojourner beside a large rock, seen across the Pathfinder lander’s deck in a stitched Mars panorama.",
      "width": 1280,
      "height": 720,
      "original": "https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/07/pathfinder20160226-16.jpg"
    },
    "image": "pathfinder",
    "evidence": "Pathfinder’s gallery panorama combines roughly 100 frames. Colors were processed to distinguish terrain; the sky and a small area near the antenna were retouched.",
    "credit": "NASA/JPL-Caltech",
    "researched": "2026-11-14",
    "glossary": [
      {
        "term": "Sol",
        "definition": "A Martian solar day, used to count days of surface operations.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "term": "Heat shield",
        "definition": "A protective part of the entry system that takes the effects of atmospheric heating.",
        "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/"
      }
    ]
  },
  "shield": {
    "aliases": [
      "opportunity",
      "oppy",
      "mer-b",
      "spirit"
    ],
    "events": [
      {
        "date": "2003-07-07",
        "label": "Rover launch",
        "detail": "Opportunity departed Earth with its entry hardware.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "date": "2004-01-25",
        "label": "Landing (UTC)",
        "detail": "The shield separated during entry before rover touchdown.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "date": "2005-01-02",
        "label": "Shield photographed",
        "detail": "Opportunity documented the remains.",
        "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/"
      },
      {
        "date": "2018-06-10",
        "label": "Rover’s last communication",
        "detail": "A major dust storm darkened the solar-powered rover’s sky.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "date": "2019-02-13",
        "label": "Rover mission declared complete",
        "detail": "Recovery efforts ended; the shield had already been inactive since entry.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      }
    ],
    "instruments": [
      {
        "name": "Heat shield",
        "purpose": "Protected the spacecraft during atmospheric entry; the shield itself was not a science instrument.",
        "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/"
      },
      {
        "name": "Rover cameras and spectrometers",
        "purpose": "Opportunity examined rock textures and minerals after landing.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      }
    ],
    "related": [
      "pathfinder",
      "backshell"
    ],
    "discovery": {
      "text": "Opportunity found mineral and rock evidence of ancient water; this exhibit is its discarded shield, not the rover itself.",
      "source": "https://science.nasa.gov/mission/mer-opportunity/"
    },
    "finalOutcome": {
      "text": "The shield separated in 2004. Opportunity’s later silence in 2018 followed a severe dust storm; NASA ended recovery attempts in February 2019.",
      "source": "https://science.nasa.gov/mission/mer-opportunity/"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/",
      "type": "Surface photograph",
      "alt": "On Jan. 2, 2005, the rover’s panoramic camera photographed the shield remains from the Martian surface.",
      "width": 1280,
      "height": 727
    },
    "researched": "2026-11-14",
    "references": [
      {
        "title": "NASA · Spirit and Opportunity science",
        "url": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
      },
      {
        "title": "NASA · Opportunity mission history",
        "url": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "title": "NASA · Spirit mission history",
        "url": "https://science.nasa.gov/mission/mer-spirit/"
      }
    ],
    "glossary": [
      {
        "term": "Sol",
        "definition": "A Martian solar day, used to count days of surface operations.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "term": "Heat shield",
        "definition": "A protective part of the entry system that takes the effects of atmospheric heating.",
        "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/"
      }
    ]
  },
  "insight": {
    "aliases": [
      "marsquakes",
      "seismometer",
      "seis",
      "mars quake"
    ],
    "events": [
      {
        "date": "2018-05-05",
        "label": "Launch",
        "detail": "InSight departed Earth.",
        "source": "https://science.nasa.gov/mission/insight/"
      },
      {
        "date": "2018-11-26",
        "label": "Landing",
        "detail": "It reached Elysium Planitia.",
        "source": "https://science.nasa.gov/mission/insight/"
      },
      {
        "date": "2022-12-15",
        "label": "Last communication",
        "detail": "The final contact preceded two missed communication attempts.",
        "source": "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/"
      },
      {
        "date": "2022-12-21",
        "label": "Retirement announced",
        "detail": "NASA declared the mission over after loss of power.",
        "source": "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/"
      }
    ],
    "instruments": [
      {
        "name": "SEIS seismometer",
        "purpose": "Measured ground vibrations from marsquakes and impacts.",
        "source": "https://science.nasa.gov/mission/insight/science-instruments/"
      },
      {
        "name": "RISE radio experiment",
        "purpose": "Tracked rotational wobble to investigate the core.",
        "source": "https://science.nasa.gov/mission/insight/science-instruments/"
      },
      {
        "name": "HP3 heat probe",
        "purpose": "Attempted deep heat-flow measurements but did not reach its intended depth.",
        "source": "https://science.nasa.gov/mission/insight/science-instruments/"
      }
    ],
    "related": [
      "alsep",
      "viking"
    ],
    "discovery": {
      "text": "Seismic measurements let researchers investigate the planet’s internal layers.",
      "source": "https://science.nasa.gov/mission/insight/science-instruments/"
    },
    "finalOutcome": {
      "text": "Dust-covered solar arrays could no longer provide enough power. NASA announced retirement on 21 December 2022; last contact was 15 December.",
      "source": "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/photojournal/insights-final-selfie/",
      "type": "Selfie mosaic",
      "alt": "InSight’s dusty deck and circular solar panels in its final selfie mosaic.",
      "width": 1280,
      "height": 768,
      "original": "https://assets.science.nasa.gov/content/dam/science/psd/photojournal/pia/pia25/pia25287/PIA25287.jpg"
    },
    "image": "insight",
    "evidence": "InSight’s final selfie, assembled from arm-camera views taken on 24 April 2022, shows dust covering the lander and solar panels.",
    "credit": "NASA/JPL-Caltech",
    "researched": "2026-11-14",
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
        "Last contact",
        "15 December 2022"
      ]
    ],
    "references": [
      {
        "title": "NASA · InSight",
        "url": "https://science.nasa.gov/mission/insight/"
      },
      {
        "title": "NASA · InSight retirement",
        "url": "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/"
      },
      {
        "title": "NASA · InSight instruments",
        "url": "https://science.nasa.gov/mission/insight/science-instruments/"
      }
    ],
    "glossary": [
      {
        "term": "Seismometer",
        "definition": "An instrument that measures tiny motions of the ground. Scientists use the resulting waves to investigate a planet’s interior.",
        "source": "https://science.nasa.gov/mission/insight/science-instruments/"
      },
      {
        "term": "Marsquake",
        "definition": "Ground shaking on Mars. Its seismic waves can carry information about the rocks they travel through.",
        "source": "https://science.nasa.gov/mission/insight/science-instruments/"
      }
    ]
  },
  "backshell": {
    "aliases": [
      "perseverance",
      "parachute",
      "mars 2020",
      "landing system"
    ],
    "events": [
      {
        "date": "2020-07-30",
        "label": "Launch",
        "detail": "Mars 2020 departed Earth.",
        "source": "https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/mission/"
      },
      {
        "date": "2021-02-18",
        "label": "Descent and separation",
        "detail": "The backshell and parachute separated before rover touchdown.",
        "source": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/"
      },
      {
        "date": "2022-04-19",
        "label": "Aerial inspection",
        "detail": "Ingenuity photographed the remains during flight 26.",
        "source": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/"
      }
    ],
    "instruments": [
      {
        "name": "Parachute and backshell",
        "purpose": "Engineering systems that slowed and protected the spacecraft during descent.",
        "source": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/"
      }
    ],
    "related": [
      "shield",
      "ingenuity"
    ],
    "discovery": {
      "text": "Images from above offered engineers evidence of how landing hardware survived impact.",
      "source": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/"
    },
    "finalOutcome": {
      "text": "These delivery components were deliberately separated; their retirement does not mean Perseverance’s scientific mission ended.",
      "source": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/photojournal/rover-landing-gear-seen-from-the-air-by-mars-helicopter/",
      "type": "Aerial photograph",
      "alt": "Ingenuity photographed the backshell and parachute from about eight meters above the surface on April 19, 2022.",
      "width": 1280,
      "height": 1193
    },
    "researched": "2026-11-14",
    "glossary": [
      {
        "term": "Sol",
        "definition": "A Martian solar day, used to count days of surface operations.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "term": "Heat shield",
        "definition": "A protective part of the entry system that takes the effects of atmospheric heating.",
        "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/"
      }
    ]
  },
  "ingenuity": {
    "aliases": [
      "helicopter",
      "mars helicopter",
      "flight",
      "rotorcraft"
    ],
    "events": [
      {
        "date": "2020-07-30",
        "label": "Launch with Mars 2020",
        "detail": "The helicopter traveled with Perseverance.",
        "source": "https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/mission/"
      },
      {
        "date": "2021-02-18",
        "label": "Arrival",
        "detail": "Perseverance delivered it to Mars.",
        "source": "https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/mission/"
      },
      {
        "date": "2021-04-19",
        "label": "First powered flight",
        "detail": "Controlled flight was demonstrated on another planet.",
        "source": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
      },
      {
        "date": "2024-01-18",
        "label": "Final flight",
        "detail": "Flight 72 ended with rotor damage.",
        "source": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
      },
      {
        "date": "2024-01-25",
        "label": "Flight mission ended",
        "detail": "NASA announced the end of flying operations.",
        "source": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
      }
    ],
    "instruments": [
      {
        "name": "Counter-rotating rotors",
        "purpose": "Generated lift in the thin Martian atmosphere.",
        "source": "https://www.jpl.nasa.gov/missions/ingenuity/"
      },
      {
        "name": "Navigation camera",
        "purpose": "Supported autonomous flight by tracking surface features.",
        "source": "https://www.jpl.nasa.gov/missions/ingenuity/"
      }
    ],
    "related": [
      "backshell",
      "pathfinder"
    ],
    "discovery": {
      "text": "A five-flight technology demonstration grew into 72 flights and aerial scouting.",
      "source": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
    },
    "finalOutcome": {
      "text": "Rotor damage on the final landing ended the ability to fly. The helicopter remains on Mars.",
      "source": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
    },
    "imageMeta": {
      "source": "https://science.nasa.gov/resource/perseverance-spots-ingenuity-at-its-final-airfield/",
      "type": "Enhanced-color mosaic",
      "alt": "Perseverance photographed the helicopter at its final airfield on Feb. 4, 2024. NASA assembled six frames into the enhanced-color mosaic.",
      "width": 1200,
      "height": 567
    },
    "researched": "2026-11-14",
    "glossary": [
      {
        "term": "Sol",
        "definition": "A Martian solar day, used to count days of surface operations.",
        "source": "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        "term": "Heat shield",
        "definition": "A protective part of the entry system that takes the effects of atmospheric heating.",
        "source": "https://science.nasa.gov/photojournal/opportunitys-heat-shield-in-color-sol-335/"
      }
    ],
    "references": [
      {
        "title": "NASA · Ingenuity mission",
        "url": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
      },
      {
        "title": "JPL · Ingenuity flight engineering",
        "url": "https://www.jpl.nasa.gov/missions/ingenuity/"
      }
    ]
  }
};
exhibits.forEach(record=>Object.assign(record,missionResearch[record.id] || {}));
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
    "title": "NSSDCA · Apollo 11 Lunar Module / EASEP",
    "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
    "description": "Direct retrieval verified this catalog identifies Eagle and the Apollo 11 early surface experiments. It documents the 20 July landing and 21 July ascent in UTC.",
    "status": "Reviewed by direct retrieval",
    "group": "Moon & archives"
  },
  {
    "title": "NSSDCA · Apollo 15 Lunar Module / ALSEP",
    "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
    "description": "This catalog is the Apollo 15 lunar module record, including the rover it carried. It is not a standalone LRV catalog entry.",
    "status": "Reviewed by direct retrieval",
    "group": "Moon & archives"
  },
  {
    "title": "NSSDCA · Apollo 12 Lunar Module / ALSEP",
    "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
    "description": "This entry describes Apollo 12 Intrepid and its experiments, not the Apollo 17 station featured in the exhibit. Linked separately to avoid confusing the two missions.",
    "status": "Reviewed by direct retrieval",
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

// Grounded cross-mission answers for the built-in guide and optional server context.
const museumKnowledge = [
  {
    "id": "opportunity-ended",
    "keywords": [
      "opportunity stop",
      "opportunity stopped",
      "opportunity end",
      "oppy died",
      "last message",
      "battery dark"
    ],
    "answer": "Opportunity last communicated on 10 June 2018 during a major dust storm that reduced sunlight for its solar panels. Recovery attempts failed, and NASA declared the mission complete on 13 February 2019. The museum exhibit shows its heat shield, which had separated in 2004; the rover and shield have different endings.",
    "source": "https://science.nasa.gov/mission/mer-opportunity/",
    "related": [
      "shield",
      "pathfinder"
    ]
  },
  {
    "id": "spirit-opportunity",
    "keywords": [
      "spirit opportunity difference",
      "spirit versus opportunity",
      "spirit vs opportunity",
      "spirit and opportunity"
    ],
    "answer": "Spirit and Opportunity were twin Mars Exploration Rovers, sent to different sites to investigate past water. Spirit explored Gusev Crater and last communicated on 22 March 2010 after becoming stuck in soil. Opportunity explored Meridiani Planum and last communicated on 10 June 2018 during a dust storm. This collection features Opportunity’s discarded heat shield, not a separate Spirit exhibit.",
    "source": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    "sources": [
      "https://science.nasa.gov/mission/mer-spirit/",
      "https://science.nasa.gov/mission/mer-opportunity/"
    ],
    "related": [
      "shield"
    ]
  },
  {
    "id": "longest-rover",
    "keywords": [
      "longest rover",
      "rover survived longest",
      "longest lasting",
      "longest lived",
      "furthest rover",
      "farthest rover"
    ],
    "answer": "“Longest” can mean operating time or driving distance. Among the completed rover missions discussed in this museum, Opportunity operated from 2004 until its final communication in 2018, far beyond its 90-sol plan. NASA records a total of 45.16 km. This is a historical total, not a claim that it still holds the current distance record. The museum does not maintain live rover rankings.",
    "source": "https://science.nasa.gov/mission/mer-opportunity/",
    "related": [
      "shield",
      "pathfinder"
    ]
  },
  {
    "id": "marsquake",
    "keywords": [
      "marsquake",
      "mars quake",
      "quake on mars"
    ],
    "answer": "A marsquake is shaking of the Martian ground. A seismometer measures the resulting vibrations. By studying how seismic waves travel, scientists investigate internal layers that cameras cannot see. InSight’s measurements also detected vibrations from meteorite impacts.",
    "source": "https://science.nasa.gov/mission/insight/science-instruments/",
    "related": [
      "insight",
      "alsep"
    ]
  },
  {
    "id": "seismometer",
    "keywords": [
      "seismometer work",
      "seismic instrument",
      "seismometer",
      "seismic waves"
    ],
    "answer": "A seismometer measures ground motion. Waves from quakes and impacts change as they travel through different materials, allowing scientists to infer properties of a planet’s interior. InSight’s SEIS instrument used environmental sensors to help distinguish seismic signals from effects such as wind.",
    "source": "https://science.nasa.gov/mission/insight/science-instruments/",
    "related": [
      "insight",
      "alsep"
    ]
  },
  {
    "id": "insight-ended",
    "keywords": [
      "insight stop",
      "insight end",
      "insight power",
      "insight dust"
    ],
    "answer": "Dust on InSight’s solar panels reduced available power. The last communication was on 15 December 2022. NASA announced the mission’s retirement on 21 December after two failed contact attempts. The heat probe also did not reach its intended depth; that instrument limitation is distinct from the later power loss.",
    "source": "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
    "sources": [
      "https://science.nasa.gov/mission/insight/science-instruments/"
    ],
    "related": [
      "insight"
    ]
  },
  {
    "id": "left-behind",
    "keywords": [
      "why nasa leave",
      "left equipment moon",
      "abandoned equipment",
      "leave equipment",
      "left behind",
      "historically important"
    ],
    "answer": "The objects have different histories. Landing stages and heat shields were designed to finish one job and stay behind. Lunar rovers had no return vehicle. Experiment stations were left to keep measuring. These surviving objects preserve evidence of engineering decisions and scientific exploration; calling every one a failure would be misleading. That historical interpretation is the museum’s theme.",
    "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html",
    "related": [
      "eagle",
      "rover",
      "alsep",
      "shield"
    ]
  },
  {
    "id": "lunar-rovers",
    "keywords": [
      "apollo lunar vehicles",
      "lunar rovers left",
      "moon buggy",
      "what happened rovers"
    ],
    "answer": "Apollo 15, 16 and 17 each used an electric Lunar Roving Vehicle. Their four independently powered wheels extended astronauts’ fieldwork. All three vehicles stayed on the Moon; they were surface transport rather than return spacecraft. The Apollo 15 rover covered 27.8 km.",
    "source": "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html",
    "related": [
      "rover",
      "eagle"
    ]
  },
  {
    "id": "ingenuity-flight",
    "keywords": [
      "ingenuity fly",
      "helicopter fly mars",
      "ingenuity flight",
      "thin atmosphere"
    ],
    "answer": "Ingenuity used two counter-rotating rotors to produce lift in the thin Martian atmosphere and onboard navigation to fly without a pilot controlling every movement from Earth. It demonstrated powered, controlled flight on another planet on 19 April 2021. A plan for up to five flights eventually became 72; rotor damage ended flying after the final landing.",
    "source": "https://www.jpl.nasa.gov/missions/ingenuity/",
    "related": [
      "ingenuity",
      "backshell"
    ]
  },
  {
    "id": "mars-discoveries",
    "keywords": [
      "mars discoveries",
      "discoveries mars",
      "water evidence",
      "understanding mars",
      "scientific breakthroughs"
    ],
    "answer": "Different instruments reveal different parts of Mars. Opportunity read evidence of ancient water in rocks and minerals. Pathfinder investigated rocks, soil and weather. InSight studied internal structure through seismic measurements. These findings do not establish that Mars had life; they address geology, environment and planetary history.",
    "source": "https://science.nasa.gov/mission/mer-opportunity/",
    "sources": [
      "https://science.nasa.gov/mission/mars-pathfinder/",
      "https://science.nasa.gov/mission/insight/science-instruments/"
    ],
    "related": [
      "shield",
      "pathfinder",
      "insight"
    ]
  },
  {
    "id": "viking-life",
    "keywords": [
      "viking life",
      "life mars",
      "found life",
      "aliens"
    ],
    "answer": "Viking’s soil experiments did not establish that Mars had life. Some responses were difficult to interpret, and the chemistry of the soil mattered. A biological interpretation requires evidence that rules out nonliving explanations. The museum does not claim that life has been found on Mars.",
    "source": "https://science.nasa.gov/mission/viking-1/",
    "related": [
      "viking"
    ]
  },
  {
    "id": "ingenuity-comparison",
    "keywords": [
      "five seventy two",
      "planned achieved",
      "planned versus",
      "five flights"
    ],
    "answer": "Ingenuity completed 72 flights compared with a technology-demonstration plan for no more than five. Both numbers count flights, so 72 divided by 5 equals 14.4 times that planned count. This arithmetic comparison does not imply that flight distance or duration increased by the same factor.",
    "source": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    "related": [
      "ingenuity"
    ]
  }
];

// CSA supplemental research; no planetary observations inferred from Earth metadata.
const csaResources = [
  {
    "title": "Alouette_ISIS_extract",
    "url": "https://github.com/asc-csa/Alouette_ISIS_extract",
    "revision": "9545f973df4053ea519b971dea09debf62ff93bf",
    "summary": "Extraction tools, dictionaries, example graphics and a small reception-facility CSV accompany the ionogram recovery project. Bulk scans and derived measurements are accessed separately.",
    "license": "Modified MIT-style CSA license; retain copyright/permission notice and respect the non-endorsement clause.",
    "licenseURL": "https://github.com/asc-csa/Alouette_ISIS_extract/blob/9545f973df4053ea519b971dea09debf62ff93bf/LICENSE",
    "use": "Small reception-facility metadata table reused locally."
  },
  {
    "title": "Canadian-Planetary-Emulation-Terrain-3D-Mapping-Tutorial",
    "url": "https://github.com/asc-csa/Canadian-Planetary-Emulation-Terrain-3D-Mapping-Tutorial",
    "revision": "2b9be58a16501df65f2c9ad3ed0448daff335a7e",
    "summary": "The notebook reads external XYZ laser scans and sensor-pose files, transforms scans into a common frame, reduces density and removes outliers. The repository does not bundle the 102-scan dataset.",
    "license": "Modified MIT-style CSA license; retain copyright/permission notice and respect the non-endorsement clause.",
    "licenseURL": "https://github.com/asc-csa/Canadian-Planetary-Emulation-Terrain-3D-Mapping-Tutorial/blob/2b9be58a16501df65f2c9ad3ed0448daff335a7e/LICENSE.txt",
    "use": "Point-cloud processing concepts explained with independently written synthetic illustration."
  },
  {
    "title": "NEOSSAT_Tutorial",
    "url": "https://github.com/asc-csa/NEOSSAT_Tutorial",
    "revision": "6b436857b747458dfa81e98fb7ecc6f07e648f23",
    "summary": "Notebooks query external CSA/CADC archives and display FITS observations. The repository contains tutorial outputs and a spacecraft image, not a complete telescope archive.",
    "license": "Modified MIT-style CSA license; retain copyright/permission notice and respect the non-endorsement clause.",
    "licenseURL": "https://github.com/asc-csa/NEOSSAT_Tutorial/blob/6b436857b747458dfa81e98fb7ecc6f07e648f23/LICENSE.txt",
    "use": "FITS metadata and display-stretch concepts inform archive-reading guidance; no FITS files imported."
  },
  {
    "title": "EO-Visualization-and-Search-Tutorial",
    "url": "https://github.com/asc-csa/EO-Visualization-and-Search-Tutorial",
    "revision": "5deda75ed57131fed2f8936a5ed04c0b5f9f49a6",
    "summary": "Notebooks search external EODMS imagery by area and time and display image footprints/overlays. Credentials or permissions may be needed for some archive requests; Earth SAR imagery is not a Mars map.",
    "license": "Modified MIT-style CSA license; retain copyright/permission notice and respect the non-endorsement clause.",
    "licenseURL": "https://github.com/asc-csa/EO-Visualization-and-Search-Tutorial/blob/5deda75ed57131fed2f8936a5ed04c0b5f9f49a6/LICENSE.txt",
    "use": "Area/time filtering and provenance principles inform atlas filters; no RADARSAT images or API connections imported."
  }
];
const csaReceptionFacilities = [
  {
    "alouette": "Resolute Bay, NT, Canada",
    "isis": "Resolute Bay, Canada"
  },
  {
    "alouette": "Blossom Point, MD, USA",
    "isis": "Blossom Point, Maryland"
  },
  {
    "alouette": "Falkland Islands (Islas Malvinas)",
    "isis": "Falkland Island, UK"
  },
  {
    "alouette": "St. John's, Newfoundland",
    "isis": "St Johns, Newfoundland"
  },
  {
    "alouette": "Orroral Valley, Australia",
    "isis": "Orroral, Australia"
  },
  {
    "alouette": "Prince Albert, SK, Canada",
    "isis": "Prince Albert, Canada"
  },
  {
    "alouette": "Ottawa, Canada",
    "isis": "Ottawa, Canada"
  },
  {
    "alouette": "Byrd Station, Antarctica",
    "isis": "Byrd Station, Antartica"
  },
  {
    "alouette": "Las Palmas, Canary Islands, Spain",
    "isis": "Las Palmas, Canary Islands, Spain"
  },
  {
    "alouette": "Winkfield, England, UK",
    "isis": "Winkfield, UK"
  },
  {
    "alouette": "Fort Myers, FL, USA",
    "isis": "Fort Myers, Florida"
  },
  {
    "alouette": "East Grant Forks, MN, USA",
    "isis": "East Grand Forks, Minnesota"
  },
  {
    "alouette": "Rosman, NC, USA",
    "isis": "Rosman, North Carolina"
  },
  {
    "alouette": "College, Fairbanks, AK, USA",
    "isis": "College, Alaska"
  },
  {
    "alouette": "University of Alaska, Fairbanks, AK, USA",
    "isis": "Fairbanks, Alaska"
  },
  {
    "alouette": "Woomera, Australia",
    "isis": "Woomera, Australia"
  },
  {
    "alouette": "Tromso, Norway",
    "isis": "Tromso, Norway"
  },
  {
    "alouette": "Darwin, Australia",
    "isis": "Darwin, Australia"
  },
  {
    "alouette": "Quito, Ecuador",
    "isis": "Quito, Ecuador"
  },
  {
    "alouette": "South Point, HI, USA",
    "isis": "South Point, Hawaiian Island "
  },
  {
    "alouette": "Lima, Peru",
    "isis": "Lima, Peru"
  },
  {
    "alouette": "Johannesburg, South Africa",
    "isis": "Johannesburg, South Africa"
  },
  {
    "alouette": "Kano, Nigeria",
    "isis": "Kano, Nigeria"
  },
  {
    "alouette": "Bretigny, France",
    "isis": "Bretigny, France"
  },
  {
    "alouette": "Singapore",
    "isis": "Singapore, Malaysia"
  },
  {
    "alouette": "Boulder, CO, USA",
    "isis": "Boulder, Colorado"
  },
  {
    "alouette": "Kauai, HI, USA",
    "isis": "Kauai, Hawaii"
  },
  {
    "alouette": "Kashima, Japan",
    "isis": "Kashima, Japan"
  }
];
museumKnowledge.push(...[
  {
    "id": "csa-terrain",
    "keywords": [
      "point cloud",
      "point clouds",
      "terrain tutorial",
      "canadian terrain",
      "analogue terrain",
      "csa terrain"
    ],
    "answer": "A point cloud represents a surface with many three-dimensional samples. The CSA terrain tutorial aligns laser scans using sensor poses, downsamples and removes outliers. Its real dataset is an Earth-based planetary analogue, not the Moon or Mars. The museum atlas contains a small synthetic teaching demonstration of these ideas, not measured CSA terrain.",
    "source": "https://github.com/asc-csa/Canadian-Planetary-Emulation-Terrain-3D-Mapping-Tutorial",
    "related": [
      "rover",
      "pathfinder"
    ]
  },
  {
    "id": "csa-archive",
    "keywords": [
      "alouette",
      "isis",
      "ionogram",
      "ionograms",
      "canadian archive",
      "reception facilities"
    ],
    "answer": "The CSA Alouette/ISIS project recovers information from scanned ionograms: records of radio echoes used to study Earth’s ionosphere. The museum’s Data afterlife tool lets you search a real repository table of reception-facility labels. These labels are metadata, not ionogram measurements, spacecraft positions or evidence of lunar or Martian terrain.",
    "source": "https://github.com/asc-csa/Alouette_ISIS_extract",
    "related": [
      "alsep",
      "insight"
    ]
  },
  {
    "id": "csa-neossat",
    "keywords": [
      "neossat",
      "fits",
      "radarsat",
      "eodms",
      "canadian space agency",
      "csa resources"
    ],
    "answer": "CSA’s NEOSSAT tutorial works with telescope FITS files from external archives, while its Earth-observation tutorial searches RADARSAT imagery through EODMS. They teach provenance, metadata and careful visualization. The museum does not ingest these telescope or Earth-radar datasets; NASA remains the foundation of its ten surface exhibits.",
    "source": "https://github.com/asc-csa/NEOSSAT_Tutorial",
    "sources": [
      "https://github.com/asc-csa/EO-Visualization-and-Search-Tutorial"
    ],
    "related": [
      "insight"
    ]
  }
]);

// Globe navigation explains the distinction from the schematic surface atlas.
museumKnowledge.push({id:'moon-globe',keywords:['moon globe','rotating moon','lunar globe','google earth moon'],answer:'The homepage Moon globe uses a NASA global mosaic on a sphere. Drag it, use the arrow keys, or choose a site to center its coordinates. Zoom buttons and near-side/far-side presets help exploration. Pins are enlarged and some represent landing regions rather than exact nearby hardware. It is an educational globe, not live imagery, surface-level tiles or a navigation system.',source:'https://svs.gsfc.nasa.gov/4720/',related:['eagle','surveyor','rover','alsep']});
