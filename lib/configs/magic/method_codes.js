export const methodCodes = {
  "direction_estimation": {
    "codes": [{
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1130009.7"],
      "code": "DE-BFL",
      "definition": "Best fit line"
    }, {
      "code": "DE-BFL-A",
      "definition": "Best fit line: Linear regression anchored in the origin"
    }, {
      "code": "DE-BFL-O",
      "definition": "Best fit line: Linear regression with origin included but not anchored in calculations"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1130009.7"],
      "code": "DE-BFP",
      "definition": "Best fit plane"
    }, {
      "code": "DE-BFP-G",
      "definition": "Best fit plane: Great circle"
    }, {
      "code": "DE-BFP-S",
      "definition": "Best fit plane: Small circle"
    }, {
      "code": "DE-BLANKET",
      "definition": "Direction after a single demag"
    }, {
      "code": "DE-BS",
      "definition": "Bingham statistics"
    }, {
      "IAGA": "Ptype D",
      "code": "DE-DI",
      "definition": "Pole latitude and longitude calculation from mean declination-inclination"
    }, {
      "code": "DE-FM",
      "definition": "Fisher mean"
    }, {
      "code": "DE-FM-LP",
      "definition": "Fisher mean: Line and planes"
    }, {
      "code": "DE-FM-UV",
      "definition": "Fisher mean: Unit vectors"
    }, {
      "code": "DE-GRP",
      "definition": "Grouped flows: Direction is determined from multiple lava flows"
    }, {
      "code": "DE-K",
      "definition": "Kappa estimation"
    }, {
      "code": "DE-K-F",
      "definition": "Kappa estimation: McFadden's (1980) best estimate of Fisherian Kappa, given by Kf=(N-1)/(N-R), an unbiased estimate for 1/kappa"
    }, {
      "code": "DE-K-ML",
      "definition": "Kappa estimation: Maximum likelihood estimate of Fisherian Kappa, given by Kml=N/(N-R)"
    }, {
      "code": "DE-K-RAT",
      "definition": "Kappa estimation: Ratio of Kappa's from two different distributions"
    }, {
      "code": "DE-K-U",
      "definition": "Kappa estimation: Unbiased estimate of Fisherian Kappa, given by Ku=(N-2)/(N-R)"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1130009.7"],
      "code": "DE-MAD",
      "definition": "Maximum angle of deviation"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1130009.7"],
      "code": "DE-MAD-L",
      "definition": "Maximum angle of deviation: Estimated about best-fit line"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1130009.7"],
      "code": "DE-MAD-P",
      "definition": "Maximum angle of deviation: Estimated about best-fit plane"
    }, {
      "code": "DE-NRM",
      "definition": "NRM used as the direction"
    }, {
      "code": "DE-POLE",
      "definition": "Generic paleomagnetic pole"
    }, {
      "code": "DE-RAN",
      "definition": "Uses R to test for randomness of set of directions"
    }, {
      "code": "DE-TROUT",
      "definition": "Thermal Resolution of Unblocking Temperatures (TROUT) method",
      "description": "Direction estimation and automatic component picking using the TROUT method. With this method, the meas_step_min and meas_step_max columns represent the range of temperatures where 95% of the unblocking magnetization is in the considered component"
    }, {
      "code": "DE-V",
      "definition": "Definition of parameter V for different sets of N & R directions"
    }, {
      "IAGA": "Ptype V",
      "code": "DE-VGP",
      "definition": "Pole latitude and longitude calculation from mean VGP"
    }, {
      "code": "DE-VM",
      "definition": "Vector mean, including magnitude of vector, rather than just Fisher mean unit vectors"
    }],
    "label": "Direction Estimation"
  },
  "sample_orientation": {
    "codes": [{
      "code": "SO-ASO",
      "definition": "Determining orientation by acoustic scanning in drill holes"
    }, {
      "code": "SO-CMD-NORTH",
      "definition": "Correction applied for magnetic declination: True north"
    }, {
      "code": "SO-CMD-ZERO",
      "definition": "Correction applied for magnetic declination: Zero"
    }, {
      "code": "SO-CO",
      "definition": "Plaster (or similar substance) cap-oriented samples"
    }, {
      "code": "SO-DML",
      "definition": "Determining orientation by deep matter logging in drill holes"
    }, {
      "code": "SO-GAD",
    }, {
      "code": "SO-GPS-DIFF",
      "definition": "Differential GPS"
    }, {
      "code": "SO-GT5",
      "definition": "Sample orientation uncertainty greater than five degrees"
    }, {
      "code": "SO-INCL",
      "definition": "Inclinometer"
    }, {
      "code": "SO-MAG",
      "definition": "Magnetic compass"
    }, {
      "code": "SO-NO",
      "definition": "Unknown sample orientation method"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1060009.1.2"],
      "code": "SO-POM",
      "definition": "Pomeroy orientation device"
    }, {
      "code": "SO-REC",
      "definition": "Calculated from a combination of corrected and uncorrected directional data"
    }, {
      "code": "SO-SIGHT",
      "definition": "Sighting"
    }, {
      "code": "SO-SIGHT-AZ",
      "definition": "Sighting: Azimuth"
    }, {
      "code": "SO-SIGHT-BACK",
      "definition": "Sighting: Backsighting"
    }, {
      "code": "SO-SIGHT-GF",
      "definition": "Sighting: Geographic feature"
    }, {
      "code": "SO-SIGHT-LM",
      "definition": "Sighting: Landmark"
    }, {
      "code": "SO-SM",
      "definition": "Magnetic and/or sun compass"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1060009.1.2"],
      "code": "SO-SUN",
      "definition": "Sun compass"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1060009.1.2"],
      "code": "SO-SUN-SIGHT",
      "definition": "Majority sun compass with some sighting"  
    }, {
      "code": "SO-TENSOR",
      "definition": "Determining orientation by tensor tool"
    }, {
      "code": "SO-V",
      "definition": "Vertical orientation of sample only (in drill core for example)"
    }],
    "label": "Sample Orientation"
  },
  "sample_preparation": {
    "codes": [{
      "code": "SP-ACID",
      "definition": "Acid leaching"
    }, {
      "code": "SP-CRUSH",
      "definition": "Crushing of sample"
    }, {
      "code": "SP-EM",
      "definition": "Samples embedded in matrix"
    }, {
      "code": "SP-HAND",
      "definition": "Hand picking of grain sample"
    }, {
      "code": "SP-HL",
      "definition": "Heavy liquid mineral separation"
    }, {
      "code": "SP-LD",
      "definition": "Lab drill"
    }, {
      "code": "SP-MAGN",
      "definition": "Magnetic (mineral) separation"
    }, {
      "code": "SP-POL",
      "definition": "Polishing of sample surface"
    }, {
      "code": "SP-RM",
      "definition": "Powdering of sample by ring mill with metal inserts"
    }, {
      "code": "SP-RMA",
      "definition": "Powdering of sample by ring mill with agate inserts"
    }, {
      "code": "SP-SAW",
      "definition": "Sawing rocks with diamond blade rock saw"
    }, {
      "code": "SP-SHTBOX",
      "definition": "Powdering of sample by shatterbox"
    }, {
      "code": "SP-SS-A",
      "definition": "Sub sampling: Archeological artifact"
    }, {
      "code": "SP-SS-C",
      "definition": "Sub sampling: Core"
    }, {
      "code": "SP-SS-C-PMAG",
      "definition": "Sub sampling: Core samples cut from a 1 inch diameter core",
      "description": "The standard paleomagnetc specimen cut from the longer core sampled in the field"
    }, {
      "code": "SP-SS-U",
      "definition": "Sub sampling: U-Channel"
    }, {
      "code": "SP-SYN",
      "definition": "Making synthetic material"
    }, {
      "code": "SP-SYN-AN",
      "definition": "Making synthetic material: Annealing"
    }, {
      "code": "SP-SYN-DISP",
      "definition": "Making synthetic material: Dispersion of magnetic particles in a certain matrix"
    }, {
      "code": "SP-SYN-GC",
      "definition": "Making synthetic material: Glass ceramic"
    }, {
      "code": "SP-SYN-RED",
      "definition": "Making synthetic material: Reduction"
    }, {
      "code": "SP-SYN-SG",
      "definition": "Making synthetic material: Solution growth"
    }, {
      "code": "SP-SYN-TFS",
      "definition": "Making synthetic material: Thin film sputtering"
    }, {
      "code": "SP-SYN-TFS-A",
      "definition": "Making synthetic material: Thin film sputtering atom by atom"
    }, {
      "code": "SP-SYN-TFS-M",
      "definition": "Making synthetic material: Thin film sputtering by Masking"
    }],
    "label": "Sample Preparation"
  },
  "intensity_estimation": {
    "codes": [{
      "code": "IE-AFAF",
      "definition": "Best-fit slope through NRM AF demagnetization versus TRM AF demagnetization",
      "description": "Like the Shaw (1974) method but without the ARM AF demag steps that are used to check for alteration."
    }, {
      "code": "IE-BB0",
      "definition": "Intensity normalized by GAD field at sampling location using 8x10^22 Am2 axial dipole moment"
    }, {
      "code": "IE-BETA",
      "definition": "Standard error of the paleointensity estimated by total least squares (York, 1969) as the slope of the Arai Plot"
    }, {
      "code": "IE-BICEP",
      "definition": "Bias Corrected Estimation of Paleointensity (BiCEP)",
      "description": "Bayesian paleointensity estimator of Cych et al. (in prep)."
    }, {
      "code": "IE-BOOT",
      "definition": "Thellier-type intensity and uncertainty estimated by bootstrap resampling of data",
      "description": "Specimen level paleointensity and uncertainty determined by averaging all combinations of 4 or more adjacent points within unblocking temperature interval; Sample level paleointensity and standard error estimated by bootstrap resampling of specimen data."
    }, {
      "code": "IE-BZF-WK",
      "definition": "Multidomain correction based on the back-zero-forth (BZF) and mutiple synthetic Arai signatures",
      "description": "A paleointensity technique used to account for concave-up Arai diagrams due to multidomain (MD) contributions to determine unbiased paleointensities. A comprehensive back-zero-forth (BZF) heating technique is used in addition to zero-field heating between the Thellier two opposite in-field heating steps in order to estimate paleointensities in various standard protocols and provide internal self-consistency checks. After the first BZF experiment, each sample gets total thermal remanent magnetization (tTRM) by cooling from the Curie point in the presence of a low (15 mT) laboratory- applied field. Then the BZF protocol, with the laboratory-applied tTRM as a synthetic natural remanent magnetization (NRM), using the same laboratory-applied field and temperature steps to obtain the synthetic Arai signatures, which should only represent the domain-state dependent properties of the samples. Then the original Arai diagrams are corrected from the first BZF experiment by using the Arai signatures from the repeated BZF experiment, which neutralizes the typical MD concave-up effect. Wang & Kent (2013).",
      "urls": ["https://doi.org/10.1002/ggge.20248"]
    }, {
      "code": "IE-DRAT",
      "definition": "pTRM difference ratio (DRAT)",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-244017x7"]
    }, {
      "code": "IE-DRATS",
      "definition": "pTRM difference ratio sum (DRATS)",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-244017x7"]
    }, {
      "code": "IE-F",
      "definition": "Fraction of NRM component (Coe's F number)",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-244013x5"]
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-2440012"],
      "code": "IE-FVDS",
      "definition": "Fraction of vector difference sum of NRM components"
    }, {
      "code": "IE-MLAT",
      "definition": "Paleo-latitude"
    }, {
      "code": "IE-MLAT-CPP",
      "definition": "Paleo-latitude derived from site age and a contemporaneous pole position or APWP"
    }, {
      "code": "IE-MLAT-PR",
      "definition": "Paleo-latitude derived from site age and plate reconstruction model"
    }, {
      "code": "IE-MR",
      "definition": "Mean of the ratio (TRM/NRM) obtained for different temperature steps"
    }, {
      "code": "IE-R",
      "definition": "Ratio of total TRM to NRM"
    }, {
      "urls": ["https://doi.org/10.1111/j.1365-246X.1974.tb05443.x"],
      "code": "IE-SH",
      "definition": "Best-fit slope through Shaw data"
    }, {
      "code": "IE-TT",
      "definition": "Best-fit slope through TT data"
    }, {
      "code": "IE-TTRM",
      "definition": "Using total TRM"
    }, {
      "code": "IE-WIN",
      "definition": "Windowed relative intensities"
    }],
    "label": "Intensity Estimation"
  },
  "field_sampling": {
    "codes": [{
      "code": "FS-AT",
      "definition": "Sampled with adhesive tape"
    }, {
      "code": "FS-C",
      "definition": "Coring"
    }, {
      "code": "FS-C-BARREL",
      "definition": "Coring: Barrel coring"
    }, {
      "code": "FS-C-BARREL-X",
      "definition": "Coring: Extended barrel coring"
    }, {
      "code": "FS-C-BOX",
      "definition": "Coring: Box coring"
    }, {
      "code": "FS-C-DRILL",
      "definition": "Coring: Drilling"
    }, {
      "code": "FS-C-DRILL-DSDP",
      "definition": "Coring: DSDP drilling"
    }, {
      "code": "FS-C-DRILL-IODP",
      "definition": "Coring: IODP drilling"
    }, {
      "code": "FS-C-DRILL-ODP",
      "definition": "Coring: ODP drilling"
    }, {
      "code": "FS-C-FREEZE",
      "definition": "Coring: Freeze coring"
    }, {
      "code": "FS-C-GRAV",
      "definition": "Coring: Gravity coring"
    }, {
      "code": "FS-C-MULTI",
      "definition": "Coring: Multi coring"
    }, {
      "code": "FS-C-PISTON",
      "definition": "Coring: Piston coring"
    }, {
      "code": "FS-C-PISTON-A",
      "definition": "Coring: Advanced piston coring"
    }, {
      "code": "FS-C-PISTON-F",
      "definition": "Coring: Half-length advanced piston coring"
    }, {
      "code": "FS-C-PISTON-H",
      "definition": "Coring: Hydraulic piston coring"
    }, {
      "code": "FS-C-PUSH",
      "definition": "Coring: Push coring"
    }, {
      "code": "FS-C-ROT",
      "definition": "Coring: Rotary coring"
    }, {
      "code": "FS-C-VIBRA",
      "definition": "Coring: Vibra coring"
    }, {
      "code": "FS-C-WAX",
      "definition": "Coring: Wax coring"
    }, {
      "code": "FS-D",
      "definition": "Dredging"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1040011"],
      "code": "FS-FD",
      "definition": "Field drilling using a hand-held portable drill"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1040022"],
      "code": "FS-H",
      "definition": "Hand sampling"
    }, {
      "code": "FS-LOC-GIS",
      "definition": "Location determination: Digitization of latitude and longitudes using GIS tools"
    }, {
      "code": "FS-LOC-GOOGLE",
      "definition": "Location determination: Digitization of latitude and longitudes using Google Maps or Earth"
    }, {
      "code": "FS-LOC-GPS",
      "definition": "Location determination: Latitude and longitude by GPS measurement"
    }, {
      "code": "FS-LOC-MAP",
      "definition": "Location determination: Digitization of latitude and longitudes from map"
    }, {
      "code": "FS-LOC-UTM",
      "definition": "Location determination: Latitude and longitude converted from UTM coordinates"
    }, {
      "code": "FS-SS-C",
      "definition": "Subsampling: Cubed subsample of core"
    }, {
      "code": "FS-SYN",
      "definition": "Synthetic material: No field sampling"
    }],
    "label": "Field Sampling"
  },
  "geoid": {
    "codes": [{
        "code": "GE-ALASKA94"
      }, {
        "code": "GE-CARIB97"
      }, {
        "code": "GE-DEFLEC105"
      }, {
        "code": "GE-EGM360"
      }, {
        "code": "GE-G96SSS"
      }, {
        "code": "GE-G99BM"
      }, {
        "code": "GE-G99SSS"
      }, {
        "code": "GE-GEOID03"
      }, {
        "code": "GE-GEOID06"
      }, {
        "code": "GE-GEOID09"
      }, {
        "code": "GE-GEOID12"
      }, {
        "code": "GE-GEOID12A"
      }, {
        "code": "GE-GEOID12B"
      }, {
        "code": "GE-GEOID90"
      }, {
        "code": "GE-GEOID93C"
      }, {
        "code": "GE-GEOID93E"
      }, {
        "code": "GE-GEOID93W"
      }, {
        "code": "GE-GEOID96"
      }, {
        "code": "GE-GEOID99"
      }, {
        "code": "GE-HAW93"
      }, {
        "code": "GE-MEXICO97"
      }, {
        "code": "GE-NAD27"
      }, {
        "code": "GE-NAD83"
      }, {
        "code": "GE-PRVI93"
      }, {
        "code": "GE-USGG2003"
      }, {
        "code": "GE-USGG2009"
      }, {
        "code": "GE-USGG2012"
      }, {
        "code": "GE-WGS84"}
      ],
      "label": "Geoid"
  },
  "lab_protocol": {
    "codes": [{
      "code": "LP-AF",
      "definition": "Alternating field demagnetization"
    }, {
      "code": "LP-AN",
      "definition": "Anisotropy measurement"
    }, {
      "code": "LP-AN-ARM",
      "definition": "Anisotropy measurement: ARM acquisition",
      "description": "Measure of anisotropy of anhysteretic susceptibility (AAS) via ARM acquisition (AARM). A fully demagnetized specimen is subject to ARM in three to fifteen (tensor) directions while being demagnetized after each of the ARM steps in the direction of the next ARM."
    }, {
      "code": "LP-AN-DC",
      "definition": "Anisotropy measurement: ARM acquisition with a DC field",
      "description": "anisotropy of anhysteretic remanence where the DC bias field was applied from a maximum alternating field to 0 mT."
    }, {
      "code": "LP-AN-DCP",
      "definition": "Anisotropy measurement: ARM acquisition with a DC field for part of the acquisition",
      "description": "Anisotropy measurement: Anisotropy of anhysteretic remanence where the DC bias field was applied from a maximum alternating field to a minimum alternating field, where the minimum AF is > 0 mT."
    }, {
      "code": "LP-AN-IRM",
      "definition": "Anisotropy measurement: IRM acquisition"
    }, {
      "description": "Susceptibility measured in multiple positions to determine susceptibility tensor.",
      "code": "LP-AN-MS",
      "definition": "Anisotropy measurement: Magnetic susceptibility"
    }, {
      "code": "LP-AN-TRM",
      "definition": "Anisotropy measurement: TRM acquisition"
    }, {
      "code": "LP-ARM",
      "definition": "ARM Acquisition"
    }, {
      "code": "LP-ARM-P",
      "definition": "Partial ARM Acquisition"
    }, {
      "code": "LP-ARM-AFD",
      "definition": "ARM Acquisition: AF demagnetization"
    }, {
      "code": "LP-BCR",
      "definition": "Coercivity of remanence"
    }, {
      "description": "Application of progressively larger DC fields to an sIRM to determine the field required to reduce it to zero.",
      "code": "LP-BCR-BF",
      "definition": "Coercivity of remanence: Back field method"
    }, {
      "description": "Field at which ascending loop (after subtraction of Mr) crosses the descending loop.",
      "code": "LP-BCR-CAD",
      "definition": "Coercivity of remanence: Crossing of ascending / descending loops"
    }, {
      "description": "Field at which difference between ascending and descending hysteresis loops is half the magnitude of the zero field crossings.",
      "code": "LP-BCR-HDM",
      "definition": "Coercivity of remanence: Half delta M"
    }, {
      "code": "LP-CA",
      "definition": "Experiment in controlled atmosphere"
    }, {
      "code": "LP-CA-AIR",
      "definition": "Experiment in controlled atmosphere: Air"
    }, {
      "code": "LP-CA-AR",
      "definition": "Experiment in controlled atmosphere: Argon"
    }, {
      "code": "LP-CA-CO2",
      "definition": "Experiment in controlled atmosphere: Carbon Dioxide"
    }, {
      "code": "LP-CA-HE",
      "definition": "Experiment in controlled atmosphere: Helium"
    }, {
      "code": "LP-CA-N",
      "definition": "Experiment in controlled atmosphere: Nitrogen"
    }, {
      "code": "LP-CA-VAC",
      "definition": "Experiment in controlled atmosphere: Under vacuum"
    }, {
      "code": "LP-CA-UNK",
      "definition": "Experiment in controlled atmosphere: Not specified" 
    }, {
      "code": "LP-CR-TRM",
      "definition": "Sets of TRMs acquired with different cooling rates",
      "description": "",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1180067"]
    }, {
      "description": "Variable temperature measurement sequence (e.g. in QD-MPMS) with magnetization measurements while cooling and rewarming.",
      "code": "LP-CW-NRM",
      "definition": "Cycling between cooling and warming: Room temperature NRM"
    }, {
      "description": "Variable temperature measurement sequence (e.g. in QD-MPMS) with magnetization measurements while cooling and rewarming.",
      "code": "LP-CW-SIRM",
      "definition": "Cycling between cooling and warming: Room temperature SIRM"
    }, {
      "IAGA": "DC0",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1970341"],
      "code": "LP-DC0",
      "definition": "No demagnetization carried out but only NRM values reported"
    }, {
      "IAGA": "DC1",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1970341"],
      "code": "LP-DC1",
      "definition": "Pilot demagnetizations on some samples suggest stability but only NRM values reported"
    }, {
      "IAGA": "DC2",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1970341"],
      "code": "LP-DC2",
      "definition": "Bulk demagnetization carried out on all samples but no vector diagrams shown"
    }, {
      "IAGA": "DC3",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1970341"],
      "code": "LP-DC3",
      "definition": "Vector diagrams or stereoplots with M/Mo justify demagnetization procedures used"
    }, {
      "IAGA": "DC4",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1970341"],
      "code": "LP-DC4",
      "definition": "Principal component analysis carried out from analysis of Zijderveld diagrams"
    }, {
      "IAGA": "DC5",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1970341"],
      "code": "LP-DC5",
      "definition": "Magnetic vectors isolated using two or more demagnetization methods with principle component analysis"
    }, {
      "code": "LP-DIR",
      "definition": "Directional data"
    }, {
      "code": "LP-DIR-AF",
      "definition": "Directional data: Step-wise alternating field demagnetization"
    }, {
      "code": "LP-DIR-AF-D",
      "definition": "Directional data: Step-wise alternating field demagnetization, Double"
    }, {
      "code": "LP-DIR-AF-G",
      "definition": "Directional data: Step-wise alternating field demagnetization, Triple"
    }, {
      "code": "LP-DIR-AFT",
      "definition": "Directional data: Step-wise alternating field demagnetization and then step-wise thermal demagnetization"
    }, {
      "code": "LP-DIR-CHEM",
      "definition": "Directional data: Step-wise chemical demagnetization"
    }, {
      "code": "LP-DIR-M",
      "definition": "Directional data: Step-wise microwave demagnetization"
    }, {
      "code": "LP-DIR-T",
      "definition": "Directional data: Step-wise thermal demagnetization"
    }, {
      "description": "Measurement of sample NRM on squid or spinner magnetometer, cooling in liquid nitrogen bath, rewarming in zero field and then re-measuring at room temperature.",
      "code": "LP-DM-NRM",
      "definition": "Demagnetization: Room temperature NRM"
    }, {
      "description": "Measurement of sample SIRM on squid or spinner magnetometer, cooling in liquid nitrogen bath, rewarming in zero field and then re-measuring at room temperature.",
      "code": "LP-DM-SIRM",
      "definition": "Demagnetization: Room temperature SIRM"
    }, {
      "code": "LP-FC",
      "definition": "Field cooled: Remanent magnetization measured on warming"
    }, {
      "code": "LP-FC-IM",
      "definition": "Field cooled: Induced magnetization measured on warming"
    }, {
      "code": "LP-FORC",
      "definition": "First order reversal curves or FORC analysis",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-510005.4"]
    }, {
      "code": "LP-HC",
      "definition": "Half core measurements"
    }, {
      "code": "LP-HYS",
      "definition": "Hysteresis loops"
    }, {
      "urls": ["98056"],
      "code": "LP-HYS-M",
      "definition": "Hysteresis loops: Minor loops"
    }, {
      "code": "LP-HYS-O",
      "definition": "Hysteresis loops: As a function of orientation"
    }, {
      "code": "LP-HYS-T",
      "definition": "Hysteresis loops: As a function of temperature"
    }, {
      "code": "LP-IMAG",
      "definition": "Initial magnetization curves"
    }, {
      "code": "LP-IMT",
      "definition": "Induced magnetization as a function of temperature"
    }, {
      "code": "LP-IRM",
      "definition": "IRM acquisition",
      "description": "After demagnetization a specimen is subject to successively increasing fields, acquiring partial IRMs until saturation is reached (SIRM). Remanence is measured at each step to provide the IRM acquisition curve."
    }, {
      "code": "LP-IRM-3D",
      "definition": "IRM acquisition: Thermal demagnetization of 3-axis IRM",
      "description": "IRM is applied to the specimen along three orthogonal axes at different field strengths (e.g. 5T, 0.4T, 0.12T). Then the specimen is thermally demagnetized and the magnitude along the orthogonal axis (X1,X2,X3) versus temperature is plotted."
    }, {
      "code": "LP-IRM-AFD",
      "definition": "IRM acquisition: AF demagnetization"
    }, {
      "code": "LP-IRM-DCD",
      "definition": "IRM acquisition: DC demagnetization",
      "description": "DC field is applied to remove IRM. The specimen is then exposed to increasing strengths of the reverse field until the remanence reduces to zero at Bcr. The IRMs are then plotted versus applied field producing the acquisition/removal curves."
    }, {
      "code": "LP-LT",
      "definition": "Lab protocol involving low temperature treatments"
    }, {
      "code": "LP-MC",
      "definition": "Measured while cooling"
    }, {
      "code": "LP-MC-I",
      "definition": "Measured while cooling: In laboratory field"
    }, {
      "code": "LP-MC-Z",
      "definition": "Measured while cooling: In zero field"
    }, {
      "code": "LP-MRM",
      "definition": "MRM acquisition: Microwave induced TRM"
    }, {
      "code": "LP-MRT",
      "definition": "Remanent magnetization as a function of temperature"
    }, {
      "code": "LP-MST",
      "definition": "Saturation magnetization as a function of temperature"
    }, {
      "code": "LP-MW",
      "definition": "Measured while warming"
    }, {
      "code": "LP-MW-I",
      "definition": "Measured while warming: In laboratory field"
    }, {
      "code": "LP-MW-Z",
      "definition": "Measured while warming: In zero field"
    }, {
      "code": "LP-NOMAG",
      "definition": "Magnetization is not defined. No volume or mass given."
    }, {
      "code": "LP-NO",
      "definition": "No demagnetization done. The NRM measurement."
    }, {
      "code": "LP-PFC",
      "definition": "Partial field cooled: Remanent magnetization measured on warming"
    }, {
      "code": "LP-PFC-IM",
      "definition": "Partial field cooled: Induced magnetization measured on warming"
    }, {
      "code": "LP-PI",
      "definition": "Paleointensity experiment",
      "description": "Minimal paleointensity method code, further information, about the basic method, alteration checks, and reciprocity checks can be specified using additional LP-PI codes described below."
    }, {
      "code": "LP-PI-AFAF",
      "definition": "Paleointensity experiment: AF demag of the NRM followed by AF demag of a TRM",
      "description": "This paleointensity method uses the Shaw (1974) method but without the two ARM demagnetiztion procedures that might indicate the rock has been altered by heating."
    }, {
      "code": "LP-PI-ALT",
      "definition": "Paleointensity experiment: Alteration check",
      "description": "This code is used to indicate that some kind of check was used to detect alteration of the sample during the course of the paleointensity experiments. More details can be specified using the supplemental codes described below."
    }, {
      "code": "LP-PI-ALT-AFARM",
      "definition": "Paleointensity experiment: Alteration check using AF demagnetization of ARM",
      "description": "A method to detect alteration that uses AF demagnetization of an ARM, before and after heating to impart TRM. Changes in the ARM coercivity spectrum indicate alteration.",
    }, {
      "code": "LP-PI-ALT-AFTRM",
      "definition": "Paleointensity experiment: Alteration check using AF coercivity spectrum before and after TRM acquisition",
      "description": "Check that AF coercivity spectrum does not change during paleointensity experiment."
    }, // {
      //"code": "LP-PI-ALT-DH(Do not use this code)",
      //"definition": "Paleointensity experiment: Alteration check using the double heating method",
      // Comment: Need to change the 5 contributions with this code to LP-PI-ALT-PTRM and then delete this code
    //}, 
    {
      "code": "LP-PI-ALT-PMRM",
      "definition": "Paleointensity experiment: Alteration check using a partial microwave induced TRM check",
      "description": "This is a check for reproducibility of pTRM acquisition at a specific temperature. During a Thellier-type paleointensity experiment, the specimen is reheated to a lower temperature and cooled in the laboratory field, thus reapplying a pTRM."
    }, {
      "code": "LP-PI-ALT-PTRM",
      "definition": "Paleointensity experiment: Alteration check using a pTRM check",
      "description": "This is a check for reproducibility of pTRM acquisition at a specific temperature. During a Thellier-type paleointensity experiment, the specimen is reheated to a lower temperature and cooled in the laboratory field, thus reapplying a pTRM. Coe (1967)",
      "urls": ["https://doi.org/10.1029/JZ072I012P03247"]
    }, {
      "code": "LP-PI-ALT-SUSC",
      "definition": "Paleointensity experiment: Alteration check using specimen susceptibility that does not change after successive heatings"
    }, {  
      "code": "LP-PI-ALT-TANGUY",
      "definition": "Paleointensity experiment: Alteration check of Tanguy (1975)",
      "urls": ["https://doi.org/10.1016/0012-821X(75)90043-6"]
    }, {
      "code": "LP-PI-ALT-WALTON",
      "definition": "Paleointensity experiment: Alteration check of Walton (1984)",
      "urls": ["https://doi:10.1038/310740a0"]
    }, {
      "code": "LP-PI-ARM",
      "definition": "Paleointensity experiment: Using a laboratory ARM to normalize NRM for paleofield estimation",
      "description": "Relative Paleointensity method. Any paleointensity experiment in which a laboratory ARM is used to normalize NRM for paleofield estimation, as suggested by Levi and Banerjee (1976) or the more detailed pseudo-Thellier experiments of Tauxe et al . (1995)."
    }, {
      "code": "LP-PI-BT",
      "definition": "Paleointensity experiment: Reciprocity check",
      "description": "Reciprocity checks are used to determine whether the blocking and unblocking process is the same at a given temperature during a Thellier-type experiment. This is considered an indicator of the types of grains (single or multidomain) present in the specimen."
    }, {
      "code": "LP-PI-BT-BZF",
      "definition": "Paleointensity experiment: Reciprocity check using an in-field back step, a zero-field step, and an in-field forward step",
      "description": " A comprehensive back-zero-forth(BZF) heating technique adds an additional zero-field heating between the Thellier two opposite in-field heating steps in order to estimate paleointensities in various standard protocols and provide internalself-consistency checks. Wang And Kent. (2013)",
      "urls": ["https://doi.org/10.1002/ggge.20248"]
    }, {
      "code": "LP-PI-BT-IZZI",
      "definition": "Paleointensity experiment: Reciprocity check using an in-field step, followed by two zero-field steps, followed by an in-field step",
      "description": "Heating to a specific temperature to remove NRM and then cooling in a known magnetic field to induce TRM. Followed by heating to the same or lower temperature step and then cooling in zero ambient magnetic field. Then another zero field step followed an in-field step. Yu et al. (2004)",
      "urls": ["https://doi.org/10.1029/2003GC000630"]
    }, {
      "code": "LP-PI-BT-MD",
      "definition": "Paleointensity experiment: Reciprocity check using an attempted removal of a previously placed pTRM",
      "description": "A check carried out during Thellier-type procedures to detect multidomain grains. Additional zero field heating steps are used to remove a previously placed pTRM. The ability to remove a prior pTRM step at the same temperature imparted is used as an indicator of reversal."
    }, {
      "code": "LP-PI-CHEM",
      "definition": "Paleointensity experiment using chemical demagnetization"
    }, {
      "code": "LP-PI-II",
      "definition": "Paleointensity experiment: Original Thellier-Thellier method",
      "description": "Paleointensity determined with in-field and in-field steps. Analogous to LP-PI-IZ (infield, zero field) and LP-PI-ZI (zero field, infield). Thellier, E. and O. Thellier, Sur l'intensite du champ magnetique terrestre dans le passe historique et geologique, Ann. Geophys., 15, 285-376, 1959.",
    }, {
      "code": "LP-PI-IRM",
      "definition": "Paleointensity experiment: Using a laboratory IRM to normalize NRM for paleofield estimation",
      "description": "Use of a laboratory IRM to normalize NRM for paleofield estimation."
    }, {
      "code": "LP-PI-IZ",
      "definition": "Paleointensity experiment: In-field and zero-field pair of steps"
    }, {
      "code": "LP-PI-M",
      "definition": "Paleointensity experiment: Microwave demagnetization",
      "description": "Use of microwave radiation as the energy source to unblock NRM and/or for in-field remanence acquisition."
    }, //{
    //  "code": "LP-PI-M-D(Do not use this code)",
    //  "definition": "Paleointensity experiment: Microwave demagnetization with both zero-field and in-field steps",
    //  "description": "Use of microwave radiation as the energy source to unblock NRM and/or for in-field remanence acquisition.",
      // Comment:Change contributions with this code to either LP-PI-IZ or LP-PI-ZI, then delete. Did one, two to go
   // }, 
    {
      "code": "LP-PI-M-II",
      "definition": "Paleointensity experiment: Microwave demagnetization with an in-field step followed by another in-field step (classical Thellier experiment)",
      "description": "Microwave demagnetization of the specimen and then relaxing in known ambient magnetic field. The same step is then repeated."
    }, {
      "code": "LP-PI-M-IZ",
      "definition": "Paleointensity experiment: Using a microwave TRM with an in-field step followed by a zero-field step",
      "description": "Microwave demagnetization of the specimen to the desired step and then relaxing in known ambient magnetic field. Then microwave demagnetization to the same or lower step and then relaxing in zero magnetic field to induce pTRM."
    }, {
      "code": "LP-PI-M-IZZI",
      "definition": "Paleointensity experiment: Microwave reciprocity check using an in-field step, followed by two zero-field steps, followed by an in-field step",
      "description": "Microwave demagnetization to a specific step to remove NRM and then relaxation in a known magnetic field. Followed by microwave demagnetization to the same or lower step and then relaxation in zero ambient magnetic field. Then another zero field step followed an in-field step",
    }, {
      "code": "LP-PI-M-PERP",
      "definition": "Paleointensity experiment: Microwave heating with perpendicular protocol",
      "description": "Use of microwave radiation as the energy source to unblock NRM and/or for in-field remanence acquisition. Perpendicular protocol. Each step includes a single infield step with lab field perpendicular to the NRM. The protocol can include demagnetization steps until overprint is removed."
    }, {
      "code": "LP-PI-M-QP",
      "definition": "Paleointensity experiment: Microwave heating with quasi-perpendicular protocol",
      "description": "Use of microwave radiation as the energy source to unblock NRM and/or for in-field remanence acquisition. Quasi-perpendicular protocol. Biggin et al. (2007)",
      "urls": ["https://doi.org/10.1016/j.epsl.2007.03.016"]
    }, {
      "code": "LP-PI-M-ZI",
      "definition": "Paleointensity experiment: Using a microwave TRM with a zero-field step followed by an in-field step",
      "description": "Heating the specimen to the desired temperature step and then cooling in zero ambient magnetic field. Then heating to the same or lower temperature and then cooling in a known magnetic field to induce pTRM."
    }, {
      "code": "LP-PI-MULT",
      "definition": "Paleointensity experiment: Using a multi-specimen procedure",
      "description": "Psuedo theiller?? XXXXX Tauxe 1995."
    }, {
      "code": "LP-PI-MULT-DB",
      "definition": "Paleointensity experiment: Using a multi-specimen procedure of Dekkers and Bohnel.",
      "description": "Dekkers and Bohnel (2006), 10.1016/j.epsl.2006.05.040",
      "urls": ["https://doi.org/10.1016/j.epsl.2006.05.040"]
    }, {
      "code": "LP-PI-MULT-FL",
      "definition": "Paleointensity experiment: Using a multi-specimen procedure of Fabian and Leonhardt.",
      "description": "Modification of Dekkers and Bohnel (2006) method. Fabian and Leonhardt (2010), 10.1016/j.epsl.2010.06.006",
      "urls": ["https://doi.org/10.1016/j.epsl.2010.06.006"]
    }, {
      "code": "LP-PI-PARM",
      "definition": "Paleointensity experiment: Best-fit slope through NRM remaining versus pARM gained data",
    }, {
      "code": "LP-PI-REL",
      "definition": "Paleointensity experiment: Normalized NRM for relative paleofield estimation"
    }, {
      "code": "LP-PI-REL-PT",
      "definition": "Paleointensity experiment: Normalized NRM for relative paleofield estimation using the pseudo-Thellier method"
    }, {
      "code": "LP-PI-SXTAL",
      "definition": "Paleointensity experiment: Using a single crystal approach"
    }, {
      "code": "LP-PI-TRIAXE",
      "definition": "Demagnetization/remagnetization measured continuously at increasing and decreasing temperatures",
      "description": "Triax paleointensity experiment where the magnetic field is measured insitu while changing the temperature(Le Goff and Gallet, 1961)",
      "urls" : ["https://doi.org/10.1016/j.epsl.2004.10.025"]
    }, {
      "code": "LP-PI-TRM",
      "definition": "Paleointensity experiment: Using a laboratory TRM",
      "description": "Any paleointensity experiment that uses a TRM produced in a lab controlled field. Includes all variants of the Thellier method, including the Shaw method. More details on alteration and reciprocity checks can be added using the special LP-PI-ALT and LP-PI-BT method codes."
    }, {
      "code": "LP-PI-TRM-II",
      "definition": "Paleointensity experiment: Using a laboratory TRM with an in-field step followed by another in-field step (classical Thellier experiment)",
      "description": "Heating the specimen to the desired temperature step and then cooling in known ambient magnetic field. The same step is then repeated. Ref:Thellier, O. and Thellier, E. (1959). Sur la direction du champ magnetique terrestre dans le passe historique et geologique. Annales de Geophysique 15: 285-375."
    }, {
      "code": "LP-PI-TRM-IZ",
      "definition": "Paleointensity experiment: Using a laboratory TRM with an in-field step followed by a zero-field step",
      "description": "Heating the specimen to the desired temperature step and then cooling in known ambient magnetic field. Then heating to the same or lower temperature and then cooling in zero magnetic field to induce pTRM. Aitken et al., (1988)",
      "urls": ["https://doi.org/10.1029/RG026i001p00003"]
    }, {
      "code": "LP-PI-TRM-PERP",
      "definition": "Paleointensity experiment: Using a laboratory TRM with perpendicular protocol",
      "description": "Each step includes a single infield step with lab field perpendicular  to the NRM. The protocol can include demagnetizations steps until overprint is removed."
    }, {
      "code": "LP-PI-TRM-W",
      "definition": "Paleointensity experiment: Using a laboratory TRM measured at temperature",
      "description": "Wilson method (Wilson, 1961) where the field of a specimen is measured at temperature (unblocking) instead of the easier and more common method of the specimen being measured after cooling (blocking).",
      "urls" : ["https://doi.org/10.1111/j.1365-246X.1961.tb02928.x"]
    }, {
      "code": "LP-PI-TRM-ZI",
      "definition": "Paleointensity experiment: Using a laboratory TRM with a zero-field step followed by an in-field step",
      "description": "Heating the specimen to the desired temperature step and then cooling in zero ambient magnetic field. Then heating to the same or lower temperature and then cooling in a known magnetic field to induce pTRM. Coe (1967)",
      "urls" : ["https://doi.org/10.1029/JZ072I012P03247"]
    }, {
      "code": "LP-PI-X",
      "definition": "Paleointensity experiment: Using a laboratory susceptibility to normalize NRM for paleofield estimation"
    }, {
      "code": "LP-PI-ZI",
      "definition": "Paleointensity experiment: Zero-field and in-field pair of steps"
    }, {
      "code": "LP-QDM",
      "definition": "A quantum diamond microscope (QDM) experiment",
      "description": "A quantum diamond microscope is used to measure the magnetic induction over a sample and then the magnetic moment of the sample can be calculated. QDM employs optically addressable nitrogen vacancy centers in diamond that are sensitive to magnetic fields via the Zeeman effect. Glen, et al. and (2017), Fu et al. 2017",
      "urls" : ["https://doi.org/10.1002/2017GC006946","https://doi.org/10.1016/j.epsl.2016.09.038"]
    }, {
      "code": "LP-QDM-R",
      "definition": "A quantum diamond microscope (QDM) experiment - remanent magnetization mapping",
      "description": "A quantum diamond microscope is used to measure the magnetic induction over a sample and then the magnetic moment of the sample can be calculated. Remanent magnetization mapping is done by adding the two bias field measurements. QDM employs optically addressable nitrogen vacancy centers in diamond that are sensitive to magnetic fields via the Zeeman effect. Glen, et al. and (2017), Fu et al. 2017",
      "urls" : ["https://doi.org/10.1002/2017GC006946","https://doi.org/10.1016/j.epsl.2016.09.038"]
    }, {
      "code": "LP-QDM-I",
      "definition": "A quantum diamond microscope (QDM) experiment - induced magnetization mapping",
      "description": "A quantum diamond microscope is used to measure the magnetic induction over a sample and then the magnetic moment of the sample can be calculated. Induced magnetization mapping is done by subtracting the two bias field measurements. QDM employs optically addressable nitrogen vacancy centers in diamond that are sensitive to magnetic fields via the Zeeman effect. Glen, et al. and (2017), Fu et al. 2017",
      "urls" : ["https://doi.org/10.1002/2017GC006946","https://doi.org/10.1016/j.epsl.2016.09.038"]
    }, {
      "code": "LP-SQUIDM",
      "definition": "A SQUID microscopy experiment",
      "description": "Superconducting quantum interference device (SQUID) microscopy enables ultra-sensitive measurements of net magnetic moments. By employing small (typically <100 μm) pickup loops brought extremely close to the samples, these instruments are capable of mapping the vertical component of the sample magnetic field with resolutions as low as 10 pT at spatial resolutions of 150 μm or better.  Lima and Weiss, (2016) and Fu et al. (2017)",
      "urls" : ["https://doi.org/10.1002/2016GC006487","https://doi.org/10.1016/j.epsl.2016.09.038"]
    }, {
      "code": "LP-T",
      "definition": "Thermal demagnetization"
    }, {
      "code": "LP-TRM",
      "definition": "TRM acquisition"
    }, {
      "code": "LP-TRM-AFD",
      "definition": "TRM acquisition: AF demagnetization"
    }, {
      "code": "LP-TRM-TD",
      "definition": "TRM acquisition: Thermal demagnetization"
    }, {
      "code": "LP-U",
      "definition": "U-Channel"
    }, {
      "code": "LP-VRM",
      "definition": "Viscous acquisition of remanent magnetization"
    }, {
      "code": "LP-VRM-D",
      "definition": "Viscous acquisition of remanent magnetization: Decay"
    }, {
      "code": "LP-WC",
      "definition": "Whole core measurements"
    }, {
      "code": "LP-X",
      "definition": "Susceptibility measurement"
    }, {
      "code": "LP-X-DC",
      "definition": "Susceptibility measurement: As a function of external DC field",
      "description": "An external DC field is varied while measuring the susceptibility."
    }, {
      "code": "LP-X-F",
      "definition": "Susceptibility measurement: As a function of frequency"
    }, {
      "code": "LP-X-FERRO",
      "definition": "Susceptibility measurement: Independent measurements of low field and highfield susceptibility for getting ferromagnetic susceptibility",
      "description": "Ferromagnetic susceptibility is the low-field minus the high-field susceptibility to correct for paramagnetic contribution.",
    }, {
      "code": "LP-X-H",
      "definition": "Susceptibility measurement: As a function of amplitude"
    }, {
      "code": "LP-X-T",
      "definition": "Susceptibility measurement: As a function of temperature"
    }, {
      "code": "LP-XPEEM",
      "definition": "X‐ray photoelectron emission microscopy",
      "description": "The magnetic contrast is provided by X‐ray magnetic circular dichroism, where the efficiency of electron ejection from the sample's surface by circularly polarized X‐rays depends on the relative orientation of the local magnetic moment and the X‐ray beam. This can be used to calculate the local magnetic moment and paleointensities. (van der Laan, 2013; Bryson, Herrero-Albillos et al., 2014)",
      "urls" : ["https://doi.org/10.1088/1742-6596/430/1/012127","https://doi.org/10.1016/j.epsl.2014.04.016"]
    }, {
      "code": "LP-XPEEM-1",
      "definition": "X‐ray photoelectron emission microscopy: One specimen orientation",
      "description": "The magnetic contrast is provided by X‐ray magnetic circular dichroism, where the efficiency of electron ejection from the sample's surface by circularly polarized X‐rays depends on the relative orientation of the local magnetic moment and the X‐ray beam. This can be used to calculate the local magnetic moment and paleointensities. Each spot is measured in one orientation. (Bryson et al., 2015; Nichols et al. 2018)",
      "urls" : ["https://doi.org/10.1038/nature14114","https://doi.org/10.1016/j.gca.2018.03.009"]
    }, {
      "code": "LP-XPEEM-3",
      "definition": "X‐ray photoelectron emission microscopy: Three specimen orientations",
      "description": "The magnetic contrast is provided by X‐ray magnetic circular dichroism, where the efficiency of electron ejection from the sample's surface by circularly polarized X‐rays depends on the relative orientation of the local magnetic moment and the X‐ray beam. This can be used to calculate the local magnetic moment and paleointensities. Each spot is measured in three orientations rotated by 120 degrees. This allows for direct estimates of the direction and intensity of the ancient field. (Bryson et al., 2019)",
      "urls" : ["https://doi.org/10.1029/2019JE005951"]
    }, {
      "code": "LP-ZFC",
      "definition": "Zero field cooled: Remanent magnetization measured on warming"
    }, {
      "code": "LP-ZFC-IM",
      "definition": "Zero field cooled: Induced magnetization measured on warming"
    }],
    "label": "Lab Protocol"
  },
  "lab_treatment": {
    "codes": [{
      "code": "LT-AF-D",
      "definition": "Alternating field: Double demagnetization with AF along X,Y,Z measurement followed by AF along -X,-Y,-Z measurement"
    }, {
      "code": "LT-AF-G",
      "definition": "Alternating field: Triple demagnetization with AF along Y,Z,X measurement followed by AF along Y and AF along Z measurement"
    }, {
      "code": "LT-AF-I",
      "IAGA": "A",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch5.html#LT-AFI"],
      "description": "AF demagnetization in a small DC field offset to produce an ARM.",
      "definition": "Alternating field: In laboratory field"
    }, {
      "code": "LT-AF-Z",
      "definition": "Alternating field: In zero field",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are typically reoriented in three or more orthogonal axes.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"],
      "IAGA": "A"
    }, {
      "code": "LT-AF-Z-X",
      "definition": "Alternating field: In zero field along the X axis only",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the X axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-XYZ",
      "definition": "Alternating field: In zero field along the X, then the Y, and then the Z axes",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the X axis, then the Y axis, and finally the Z axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-XZY",
      "definition": "Alternating field: In zero field along the X, then the Z, and then the Y axes",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the X axis, then the Z axis, and finally the Y axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-Y",
      "definition": "Alternating field: In zero field along the Y axis only",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the Y axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"],
    }, {
      "code": "LT-AF-Z-YXZ",
      "definition": "Alternating field: In zero field along the Y, then the X, and then the Z axes",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the Y axis, then the X axis, and finally the Z axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-YZX",
      "definition": "Alternating field: In zero field along the Y, then the Z, and then the X axes",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the Y axis, then the Z axis, and finally the X axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-Z",
      "definition": "Alternating field: In zero field along the Z axis only",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the Y axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-ZXY",
      "definition": "Alternating field: In zero field along the Z, then the X, and then the Y axes",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the Z axis, then the X axis, and finally the Y axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-ZYX",
      "definition": "Alternating field: In zero field along the Z, then the Y, and then the X axes",
      "description": "A specimen is subject to a decaying and alternating magnetic field such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are oriented along the Z axis, then the Y axis, and finally the X axis.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-AFZ"]
    }, {
      "code": "LT-AF-Z-TUMB",
      "description": "A specimen is subject to a decaying and alternating magnetic field using a tumbling demagnetizer such that the magnetic moments with coercivities below the peak field are aligned in opposed directions, and thus cancel. Specimens are typically reoriented in three or more orthogonal axes.",
      "definition": "Alternating field: In zero field using a tumbling AF demagnetizer"
    }, {
      "code": "LT-CHEM",
      "definition": "Cleaning of porous rocks by chemical leaching",
      "IAGA": "H"
    }, {
      "code": "LT-CHEM-HCL",
      "definition": "Cleaning of porous rocks by chemical leaching with HCl",
      "IAGA": "H"
    }, {
      "code": "LT-FC",
      "definition": "Specimen cooled with laboratory field on"
    }, {
      "code": "LT-HT-I",
      "definition": "High temperature treatment: In laboratory field"
    }, {
      "code": "LT-HT-Z",
      "definition": "High temperature treatment: In zero field"
    }, {
      "code": "LT-IRM",
      "definition": "IRM imparted to specimen prior to measurement"
    }, {
      "code": "LT-LT-I",
      "definition": "Low temperature treatment: In laboratory field"
    }, {
      "description": "In zero field the specimen is cooled to low temperature and warmed prior to measurement. Low temperature cycling of specimens can detect presence of particles whose magnetic properties depend on magnetocrystalline anisotropy, including multidomain grains.",
      "code": "LT-LT-Z",
      "definition": "Low temperature treatment: In zero field"
    }, {
      "code": "LT-M-I",
      "definition": "Using microwave radiation: In laboratory field"
    }, {
      "code": "LT-M-Z",
      "definition": "Using microwave radiation: In zero field"
    }, {
      "IAGA": "N",
      "code": "LT-NO",
      "definition": "No treatments applied before measurement"
    }, {
      "code": "LT-NRM-APAR",
      "definition": "Specimen heating and cooling: Laboratory field anti-parallel to the NRM vector"
    }, {
      "code": "LT-NRM-PAR",
      "definition": "Specimen heating and cooling: Laboratory field parallel to the NRM vector"
    }, {
      "urls": ["http://dx.doi.org/10.1111/j.1365-246X.1994.tb03999.x"],
      "code": "LT-TRM-PAR",
      "definition": "Specimen heating and cooling: Laboratory field parallel to the TRM vector"
    }, {
      "code": "LT-NRM-PERP",
      "definition": "Specimen heating and cooling: Laboratory field perpendicular to the NRM vector"
    }, {
      "urls": ["https://doi.org/10.1016/S1474-7065(03)00122-0"],
      "description": "A modification of the Thellier–Thellier experiment that detects the presence of MD particles by verifying the law of additivity of pTRMs. The law of additivity is valid for regular pTRMs (i.e. the upper temperature of pTRM acquisition is reached by cooling from the Curie temperature) for both SD and MD particles, whereas it is not valid for pTRM* (the upper temperature of pTRM acquisition is reached by heating from room temperature) in the case of MD particles. As the partial thermoremanences imparted in Thellier–Thellier experiments are of the pTRM* type, additivity as a prerequisite for the validity of the obtained result is not given if the remanence is carried predominantly by MD particles (Krasa et al., 2003).",
      "code": "LT-PMRM-AC",
      "definition": "pTRM check: additivity check step while using microwave demagnetization"
    }, {
      "description": "After treatment at a particular temperature step, the specimen is then reheated to a lower temperature and cooled with the laboratory field on thus reapplying a pTRM.",
      "code": "LT-PMRM-I",
      "definition": "pMRM check: After zero field step, perform an in field cooling after heating to lower T with  microwave radiation"
    }, {
      "description": "A check carried out during Thellier procedures to detect multidomain grains. Additional zero field heating steps are used to remove a previously placed pTRM. The ability to remove a prior pTRM step at the same temperature imparted is used as an indicator of reversal.",
      "code": "LT-PMRM-MD",
      "definition": "pMRM tail check: After in laboratory field step, perform a zero field cooling after heating with same microwave power and time "
    }, {
      "description": "After heating to a particular temperature step and cooling in field. The specimen is heated to a lower temperature step and cooled in zero field. This checks for low temperature pTRM tails.",
      "code": "LT-PMRM-Z",
      "definition": "pMRM tail check: After in laboratory field step, perform a zero field cooling after microwave heating at a lower power/time"
    }, {
      "urls": ["https://doi.org/10.1016/S1474-7065(03)00122-0"],
      "description": "A modification of the Thellier–Thellier experiment that detects the presence of MD particles by verifying the law of additivity of pTRMs. The law of additivity is valid for regular pTRMs (i.e. the upper temperature of pTRM acquisition is reached by cooling from the Curie temperature) for both SD and MD particles, whereas it is not valid for pTRM* (the upper temperature of pTRM acquisition is reached by heating from room temperature) in the case of MD particles. As the partial thermoremanences imparted in Thellier–Thellier experiments are of the pTRM* type, additivity as a prerequisite for the validity of the obtained result is not given if the remanence is carried predominantly by MD particles (Krasa et al., 2003).",
      "code": "LT-PTRM-AC",
      "definition": "pTRM check: additivity check step while using thermal demagnetization"
    }, {
      "code": "LT-PTRM-I",
      "definition": "pTRM check: After zero field step, perform an in field cooling",
      "description": "After treatment at a particular temperature step, the specimen is then reheated to a lower temperature and cooled with the laboratory field on thus reapplying a pTRM.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch10.html#LT-pTRMI"]
    }, {
      "description": "A check carried out during Thellier procedures to detect multidomain grains. Additional zero field heating steps are used to remove a previously placed pTRM. The ability to remove a prior pTRM step at the same temperature imparted is used as an indicator of reversal.",
      "code": "LT-PTRM-MD",
      "definition": "pTRM tail check: After in laboratory field step, perform a zero field cooling at same temperature"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch10.html#LT-pTRMZ"],
      "description": "After heating to a particular temperature step and cooling in field. The specimen is heated to a lower temperature step and cooled in zero field. This checks for low temperature pTRM tails.",
      "code": "LT-PTRM-Z",
      "definition": "pTRM tail check After in laboratory field step, perform a zero field cooling at a lower temperature"
    }, {
      "code": "LT-T-I",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch10.html#LT-TI"],
      "description": "Heating to a specific temperature to remove NRM and then cooling in a known magnetic field to induce TRM.",
      "definition": "Specimen cooling: In laboratory field"
    }, {
      "code": "LT-T-Z",
      "IAGA": "T",
      "definition": "Specimen cooling: In zero field",
      "description": "Heating the specimen to the desired temperature step and then cooling in zero ambient magnetic field.",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#LT-TZ"]
    }, {
      "code": "LT-T-Z-NRM-PAR",
      "definition": "Specimen cooling: In field parallel to the NRM",
      "description": "Heating to temperature  in zero field, then cooling in a field parallel to the NRM. Dekkers and Bohnel (2006), doi:10.1016/j.epsl.2006.05.040",
      "urls": ["https://doi.org/10.1016/j.epsl.2006.05.040"]
    }, {
      "IAGA": "V",
      "description": "Placing a specimen in a zero field environment (often a MU-metal shield) allows for the relaxation of the softest components of magnetization. This randomizing effect can then be measured over time. MU-metal is Ni-Fe alloy of high permeability.",
      "code": "LT-VD",
      "definition": "Viscous demagnetization by applying MU-metal screening"
    }],
    "label": "Lab Treatment"
  },
  "geochronology_method": {
    "codes": [{
      "code": "GM-ALPHA",
      "definition": "Age determination by using alpha counting"
    }, {
      "code": "GM-ARAR",
      "definition": "40Ar/39Ar age determination"
    }, {
      "code": "GM-ARAR-AP",
      "definition": "40Ar/39Ar age determination: Age plateau"
    }, {
      "code": "GM-ARAR-II",
      "definition": "40Ar/39Ar age determination: Inverse isochron"
    }, {
      "code": "GM-ARAR-IS",
      "definition": "40Ar/39Ar age determination: Insitu spot age using laser system"
    }, {
      "code": "GM-ARAR-NI",
      "definition": "40Ar/39Ar age determination: Normal isochron"
    }, {
      "code": "GM-ARAR-SC",
      "definition": "40Ar/39Ar age determination: Single crystal age"
    }, {
      "code": "GM-ARAR-SC-10",
      "definition": "40Ar/39Ar age determination: Average age based on less than 10 single crystal ages"
    }, {
      "code": "GM-ARAR-SC-1050",
      "definition": "40Ar/39Ar age determination: Average age based on 10 to 50 single crystal ages"
    }, {
      "code": "GM-ARAR-SC-50",
      "definition": "40Ar/39Ar age determination: Average age based on more than 50 single crystal ages"
    }, {
      "code": "GM-ARAR-TF",
      "definition": "40Ar/39Ar age determination: Total fusion or recombined age"
    }, {
      "code": "GM-C14",
      "definition": "Radiocarbon age determination"
    }, {
      "code": "GM-C14-AMS",
      "definition": "Radiocarbon age determination: AMS"
    }, {
      "code": "GM-C14-BETA",
      "definition": "Radiocarbon age determination: Beta decay counting"
    }, {
      "code": "GM-C14-CAL",
      "definition": "Radiocarbon age determination: Calibrated"
    }, {
      "code": "GM-C14-UNCAL",
      "definition": "Radiocarbon age determination: Uncalibrated"
    }, {
      "code": "GM-CC",
      "definition": "Correlation chronology - Age determined from a property of the site correlated to a known timescale."
    }, {
      "code": "GM-CC-ARCH",
      "definition": "Correlation chronology: Archeology - Age determined by pottery style, flint knapping style, etc."
    }, {
      "code": "GM-CC-ARM",
      "definition": "Correlation chronology: ARM"
    }, {
      "code": "GM-CC-ASTRO",
      "definition": "Correlation chronology: Astronomical"
    }, {
      "code": "GM-CC-CACO3",
      "definition": "Correlation chronology: Calcium carbonate"
    }, {
      "code": "GM-CC-COLOR",
      "definition": "Correlation chronology: Color or reflectance"
    }, {
      "code": "GM-CC-GRAPE",
      "definition": "Correlation chronology: Gamma Ray Polarimeter Experiment"
    }, {
      "code": "GM-CC-IRM",
      "definition": "Correlation chronology: IRM"
    }, {
      "code": "GM-CC-ISO",
      "definition": "Correlation chronology: Stable isotopes"
    }, {
      "description": "Relative dating by cross-cutting relationships in the field. This method code should not be used instead of GM-STRAT if dealing with a stratigraphic succession.",
      "code": "GM-CC-REL",
      "definition": "Correlation chronology: Relative chronology other than stratigraphic successions"
    }, {
      "code": "GM-CC-S",
      "definition": "Correlation chronology: Ratio of the low field and saturation IRM"
    }, {
      "code": "GM-CC-STRAT",
      "definition": "Correlation chronology: Stratigraphic succession"
    }, {
      "code": "GM-CC-TECT",
      "definition": "Correlation chronology: Tectites and microtectites"
    }, {
      "code": "GM-CC-TEPH",
      "definition": "Correlation chronology: Tephrochronology"
    }, {
      "code": "GM-CC-X",
      "definition": "Correlation chronology: Susceptibility"
    }, {
      "code": "GM-CHEM",
      "definition": "Chemical chronology"
    }, {
      "code": "GM-CHEM-AAR",
      "definition": "Chemical chronology: Amino acid racemization"
    }, {
      "code": "GM-CHEM-OH",
      "definition": "Chemical chronology: Obsidian hydration"
    }, {
      "code": "GM-CHEM-SC",
      "definition": "Chemical chronology: Stoan coatings CaCO3"
    }, {
      "code": "GM-CHEM-TH",
      "definition": "Chemical chronology: Tephra hydration"
    }, {
      "code": "GM-COSMO",
      "definition": "Cosmogenic age determination"
    }, {
      "code": "GM-COSMO-AL26",
      "definition": "Cosmogenic age determination: 26Al"
    }, {
      "code": "GM-COSMO-AR39",
      "definition": "Cosmogenic age determination: 39Ar"
    }, {
      "code": "GM-COSMO-BE10",
      "definition": "Cosmogenic age determination: 10Be"
    }, {
      "code": "GM-COSMO-C14",
      "definition": "Cosmogenic age determination: 14C"
    }, {
      "code": "GM-COSMO-CL36",
      "definition": "Cosmogenic age determination: 36Cl"
    }, {
      "code": "GM-COSMO-HE3",
      "definition": "Cosmogenic age determination: 3He"
    }, {
      "code": "GM-COSMO-KR81",
      "definition": "Cosmogenic age determination: 81Kr"
    }, {
      "code": "GM-COSMO-NE21",
      "definition": "Cosmogenic age determination: 21Ne"
    }, {
      "code": "GM-COSMO-NI59",
      "definition": "Cosmogenic age determination: 59Ni"
    }, {
      "code": "GM-COSMO-SI32",
      "definition": "Cosmogenic age determination: 32Si"
    }, {
      "code": "GM-CS137",
      "definition": "Radioactive decay of Caesium-137 to Barium-137"  
    }, {
      "code": "GM-DENDRO",
      "definition": "Dendrochronology"
    }, {
      "code": "GM-ESR",
      "definition": "Electron Spin Resonance"
    }, {
      "code": "GM-FOSSIL",
      "definition": "Age determined from fossil record"
    }, {
      "code": "GM-FT",
      "definition": "Fission track age determination"
    }, {
      "code": "GM-HE3",
      "definition": "Helium three surface exposure age"  
    }, {
      "code": "GM-HIST",
      "definition": "Historically recorded event"
    }, {
      "code": "GM-HIST-STAMP",
      "definition": "Year determined by a date found on the object dated. Eg. Brick fired with an known age stamp"
    }, {
      "code": "GM-INT",
      "definition": "Age determination through interpolation between at least two geological units of known age"
    }, {
      "code": "GM-INT-L",
      "definition": "Age determination through interpolation between at least two geological units of known age: Linear"
    }, {
      "code": "GM-INT-S",
      "definition": "Age determination through interpolation between at least two geological units of known age: Cubic spline"
    }, {
      "code": "GM-ISO",
      "definition": "Age determined by isotopic dating, but no further details available"
    }, {
      "code": "GM-KAR",
      "definition": "40K-40Ar age determination"
    }, {
      "code": "GM-KAR-C",
      "definition": "40K-40Ar age determination: Cassignol method"
    }, {
      "code": "GM-KAR-I",
      "definition": "40K-40Ar age determination: Isochron"
    }, {
      "code": "GM-KAR-MA",
      "definition": "40K-40Ar age determination: Model age"
    }, {
      "code": "GM-KCA",
      "definition": "40K-40Ca age determination"
    }, {
      "code": "GM-KCA-I",
      "definition": "40K-40Ca age determination: Isochron"
    }, {
      "code": "GM-KCA-MA",
      "definition": "40K-40Ca age determination: Model age"
    }, {
      "code": "GM-LABA",
      "definition": "138La-138Ba age determination"
    }, {
      "code": "GM-LABA-I",
      "definition": "138La-138Ba age determination: Isochron"
    }, {
      "code": "GM-LABA-MA",
      "definition": "138La-138Ba age determination: Model age"
    }, {
      "code": "GM-LACE",
      "definition": "138La-138Ce age determination"
    }, {
      "code": "GM-LACE-I",
      "definition": "138La-138Ce age determination: Isochron"
    }, {
      "code": "GM-LACE-MA",
      "definition": "138La-138Ce age determination: Model age"
    }, {
      "code": "GM-LICHE",
      "definition": "Lichenometry"
    }, {
      "code": "GM-LUHF",
      "definition": "176Lu-176Hf age determination"
    }, {
      "code": "GM-LUHF-I",
      "definition": "176Lu-176Hf age determination: Isochron"
    }, {
      "code": "GM-LUHF-MA",
      "definition": "176Lu-176Hf age determination: Model age"
    }, {
      "code": "GM-LUM",
      "definition": "Luminescence"
    }, {
      "code": "GM-LUM-IRS",
      "definition": "Luminescence: Infrared stimulated luminescence"
    }, {
      "code": "GM-LUM-OS",
      "definition": "Luminescence: Optically stimulated luminescence"
    }, {
      "code": "GM-LUM-TH",
      "definition": "Luminescence: Thermoluminescence"
    }, {
      "code": "GM-MOD",
      "definition": "Model curve fit to available age dates"
    }, {
      "code": "GM-MOD-L",
      "definition": "Model curve fit to available age dates: Linear"
    }, {
      "code": "GM-MOD-S",
      "definition": "Model curve fit to available age dates: Cubic spline"
    }, {
      "code": "GM-MORPH",
      "definition": "Geomorphic chronology"
    }, {
      "code": "GM-MORPH-DEF",
      "definition": "Geomorphic chronology: Rate of deformation"
    }, {
      "code": "GM-MORPH-DEP",
      "definition": "Geomorphic chronology: Rate of deposition"
    }, {
      "code": "GM-MORPH-POS",
      "definition": "Geomorphic chronology: Geomorphology position"
    }, {
      "code": "GM-MORPH-WEATH",
      "definition": "Geomorphic chronology: Rock and mineral weathering"
    }, {
      "code": "GM-NO",
      "definition": "Geochronology method not specified"
    }, {
      "code": "GM-O18",
      "definition": "Oxygen isotope dating"
    }, {
      "code": "GM-PA",
      "definition": "Date determined by pollen analysis"
    }, {
      "code": "GM-PBPB",
      "definition": "207Pb-206Pb age determination"      
    }, {
      "code": "GM-PBPB-C",
      "definition": "207Pb-206Pb age determination: Common Pb"
    }, {
      "code": "GM-PBPB-I",
      "definition": "207Pb-206Pb age determination: Isochron"
    }, {
      "code": "GM-PLEO",
      "definition": "Pleochroic haloes"
    }, {
      "code": "GM-PMAG-ANOM",
      "definition": "Paleomagnetic age determination: Magnetic anomaly identification"
    }, {
      "code": "GM-PMAG-APWP",
      "definition": "Paleomagnetic age determination: Comparing paleomagnetic data to APWP"
    }, {
      "code": "GM-PMAG-ARCH",
      "definition": "Paleomagnetic age determination: Archeomagnetism"
    }, {
      "code": "GM-PMAG-DIR",
      "definition": "Paleomagnetic age determination: Directions"
    }, {
      "code": "GM-PMAG-POL",
      "definition": "Paleomagnetic age determination: Polarities"
    }, {
      "code": "GM-PMAG-REGSV",
      "definition": "Paleomagnetic age determination: Correlation to a regional secular variation curve"
    }, {
      "code": "GM-PMAG-REGSV-S",
      "definition": "Paleomagnetic age determination: Correlation to a regional secular variation curve determined in part by other GM-PMAG-REGSV-S samples. See DuBois (2008)."
    }, {
      "code": "GM-PMAG-RPI",
      "definition": "Paleomagnetic age determination: Relative paleointensity"
    }, {
      "code": "GM-PMAG-VEC",
      "definition": "Paleomagnetic age determination: Full vector"
    }, {
      "code": "GM-RATH",
      "definition": "226Ra-230Th age determination"
    }, {
      "code": "GM-RBSR",
      "definition": "87Rb-87Sr age determination"
    }, {
      "code": "GM-RBSR-I",
      "definition": "87Rb-87Sr age determination: Isochron"
    }, {
      "code": "GM-RBSR-MA",
      "definition": "87Rb-87Sr age determination: Model age"
    }, {
      "code": "GM-REOS",
      "definition": "187Re-187Os age determination"
    }, {
      "code": "GM-REOS-I",
      "definition": "187Re-187Os age determination: Isochron"
    }, {
      "code": "GM-REOS-MA",
      "definition": "187Re-187Os age determination: Model age"
    }, {
      "code": "GM-REOS-PT",
      "definition": "187Re-187Os age determination: Pt normalization of 186Os"
    }, {
      "code": "GM-SCLERO",
      "definition": "Screlochronology"
    }, {
      "code": "GM-SHRIMP",
      "definition": "SHRIMP age dating"
    }, {
      "code": "GM-SMND",
      "definition": "147Sm-143Nd age determination"
    }, {
      "code": "GM-SMND-I",
      "definition": "147Sm-143Nd age determination: Isochron"
    }, {
      "code": "GM-SMND-MA",
      "definition": "147Sm-143Nd age determination: Model age"
    }, {
      "code": "GM-THPB",
      "definition": "232Th-208Pb age determination"
    }, {
      "code": "GM-THPB-I",
      "definition": "232Th-208Pb age determination: Isochron"
    }, {
      "code": "GM-THPB-MA",
      "definition": "232Th-208Pb age determination: Model age"
    }, {
      "code": "GM-UPA",
      "definition": "235U-231Pa age determination"
    }, {
      "code": "GM-UPB",
      "definition": "U-Pb age determination"
    }, {
      "code": "GM-UPB-CC",
      "definition": "U-Pb age determination: Concordia diagram age"
    }, {
      "code": "GM-UPB-CC-T0",
      "definition": "U-Pb age determination: Concordia diagram age, upper intersection"
    }, {
      "code": "GM-UPB-CC-T1",
      "definition": "U-Pb age determination: Concordia diagram age, lower intersection"
    }, {
      "code": "GM-UPB-I-206",
      "definition": "U-Pb age determination: 238U-206Pb isochron"
    }, {
      "code": "GM-UPB-I-207",
      "definition": "U-Pb age determination: 235U-207Pb isochron"
    }, {
      "code": "GM-UPB-MA-206",
      "definition": "U-Pb age determination: 238U-206Pb model age"
    }, {
      "code": "GM-UPB-MA-207",
      "definition": "U-Pb age determination: 235U-207Pb model age"
    }, {
      "code": "GM-USD",
      "definition": "Uranium series disequilibrium age determination"
    }, {
      "code": "GM-USD-PA231-TH230",
      "definition": "Uranium series disequilibrium age determination: 231Pa-230Th"
    }, {
      "code": "GM-USD-PA231-U235",
      "definition": "Uranium series disequilibrium age determination: 231Pa-235U"
    }, {
      "code": "GM-USD-PB210",
      "definition": "Uranium series disequilibrium age determination: 210Pb"
    }, {
      "code": "GM-USD-RA226-TH230",
      "definition": "Uranium series disequilibrium age determination: 226Ra-230Th"
    }, {
      "code": "GM-USD-RA228-TH232",
      "definition": "Uranium series disequilibrium age determination: 228Ra-232Th"
    }, {
      "code": "GM-USD-TH228-TH232",
      "definition": "Uranium series disequilibrium age determination: 228Th-232Th"
    }, {
      "description": "Ionium dating in deep sea sediments.",
      "code": "GM-USD-TH230",
      "definition": "Uranium series disequilibrium age determination: 230Th"
    }, {
      "code": "GM-USD-TH230-TH232",
      "definition": "Uranium series disequilibrium age determination: 230Th-232Th"
    }, {
      "code": "GM-USD-TH230-U234",
      "definition": "Uranium series disequilibrium age determination: 230Th-234U"
    }, {
      "code": "GM-USD-TH230-U238",
      "definition": "Uranium series disequilibrium age determination: 230Th-238U"
    }, {
      "code": "GM-USD-U234-U238",
      "definition": "Uranium series disequilibrium age determination: 234U-238U"
    }, {
      "code": "GM-UTH",
      "definition": "238U-230Th age determination"
    }, {
      "code": "GM-UTHHE",
      "definition": "U-Th-He age determination"
    }, {
      "code": "GM-UTHPB",
      "definition": "U-Th-Pb age determination"
    }, {
      "code": "GM-UTHPB-CC-T0",
      "definition": "U-Th-Pb age determination: Concordia diagram intersection age, upper intercept"
    }, {
      "code": "GM-UTHPB-CC-T1",
      "definition": "U-Th-Pb age determination: Concordia diagram intersection age, lower intercept"
    }, {
      "code": "GM-VARVE",
      "definition": "Age determined by varve counting"
    }],
    "label": "Geochronology Method"
  },
  "sample_characterization": {
    "codes": [{
      "code": "SC-AAS",
      "definition": "Atomic absorption"
    }, {
      "code": "SC-ALPHA",
      "definition": "Alpha counting"
    }, {
      "code": "SC-ALPHA-ID",
      "definition": "Alpha counting isotope dilution"
    }, {
      "code": "SC-ANC",
      "definition": "Anion chromatography"
    }, {
      "code": "SC-CHN",
      "definition": "CHN"
    }, {
      "code": "SC-CHN-GC",
      "definition": "CHN gas chromatography"
    }, {
      "code": "SC-COL",
      "definition": "Colorimetric"
    }, {
      "code": "SC-COUL",
      "definition": "Coulometrical analysis"
    }, {
      "code": "SC-CSA",
      "definition": "Carbon-Sulfur analyzer"
    }, {
      "code": "SC-DCP",
      "definition": "Direct current plasma"
    }, {
      "code": "SC-DROES",
      "definition": "Direct reading optical emissions spectroscopy"
    }, {
      "code": "SC-EMP",
      "definition": "Electron microprobe"
    }, {
      "code": "SC-ENAA",
      "definition": "ENAA"
    }, {
      "code": "SC-ES",
      "definition": "Emission spectrometry"
    }, {
      "code": "SC-FLES",
      "definition": "Flame emission spectroscopy"
    }, {
      "code": "SC-FP",
      "definition": "Flame photometry"
    }, {
      "code": "SC-FTIRS",
      "definition": "Fourier transform infrared spectrometry"
    }, {
      "code": "SC-GC",
      "definition": "Gas chromatography"
    }, {
      "code": "SC-GIO",
      "definition": "Gradient ion-chromatography"
    }, {
      "code": "SC-GRAV",
      "definition": "Gravimetry"
    }, {
      "code": "SC-HPLC",
      "definition": "High-performance liquid chromatography"
    }, {
      "code": "SC-ICP",
      "definition": "ICP"
    }, {
      "code": "SC-ICPAE",
      "definition": "ICP atomic emission spectrometry"
    }, {
      "code": "SC-ICPMS",
      "definition": "ICP-MS"
    }, {
      "code": "SC-ICPMS-HR",
      "definition": "High-resolution ICP-MS"
    }, {
      "code": "SC-ICPMS-ID",
      "definition": "ICP-MS isotope dilution"
    }, {
      "code": "SC-ICPMS-LA",
      "definition": "ICP-MS laser ablation"
    }, {
      "code": "SC-ICPMS-MC",
      "definition": "Multi-collector ICP-MS"
    }, {
      "code": "SC-IDMS",
      "definition": "Isotope dilution mass spectrometry"
    }, {
      "code": "SC-IGN",
      "definition": "Ignition"
    }, {
      "code": "SC-IMP",
      "definition": "Ion microprobe"
    }, {
      "code": "SC-INAA",
      "definition": "Instrumental neutron activation analysis"
    }, {
      "code": "SC-IRSP",
      "definition": "Infra-red spectroscopy"
    }, {
      "code": "SC-ISE",
      "definition": "Ion sensitive electrode"
    }, {
      "code": "SC-MANO",
      "definition": "Manometry"
    }, {
      "code": "SC-MB",
      "definition": "Mössbauer"
    }, {
      "code": "SC-MS",
      "definition": "Mass spectrometry"
    }, {
      "code": "SC-NAA",
      "definition": "Neutron activation analysis"
    }, {
      "code": "SC-NO",
      "definition": "Unknown sample characterization method"
    }, {
      "code": "SC-OES",
      "definition": "Optical emission spectrometry"
    }, {
      "code": "SC-OPS",
      "definition": "Optical spectroscopy"
    }, {
      "code": "SC-PEN",
      "definition": "Penfield method"
    }, {
      "code": "SC-PMP",
      "definition": "Proton microprobe"
    }, {
      "code": "SC-POT",
      "definition": "Potentiometrical"
    }, {
      "code": "SC-RNAA",
      "definition": "Radioanalytical neutron activation"
    }, {
      "code": "SC-SIMS",
      "definition": "Secondary ion mass spectrometry"
    }, {
      "code": "SC-SMA",
      "definition": "Dupont solid's moisture analyzer"
    }, {
      "code": "SC-SPEC",
      "definition": "Spectrographic analysis"
    }, {
      "code": "SC-SPPH",
      "definition": "Spectrophotometric"
    }, {
      "code": "SC-SQUIDM",
      "definition": "SQUID microscopy",
      "description": "Superconducting quantum interference device (SQUID) microscopy enables ultra-sensitive measurements of net magnetic moments. By employing small (typically <100 μm) pickup loops brought extremely close to the samples, these instruments are capable of mapping the vertical component of the sample magnetic field with resolutions as low as 10 pT at spatial resolutions of 150 μm or better.  Lima and Weiss, (2016) and Fu et al. (2017)",
      "urls" : ["https://doi.org/10.1002/2016GC006487","https://doi.org/10.1016/j.epsl.2016.09.038"]
    }, {
      "code": "SC-SSID",
      "definition": "Spark source mass spectrometry isotope dilution"
    }, {
      "code": "SC-SSMS",
      "definition": "Spark source mass spectrometry"
    }, {
      "code": "SC-TITR",
      "definition": "Titration"
    }, {
      "code": "SC-TYPE-NO",
      "definition": "Not specified"  
    }, {
      "code": "SC-TYPE-CYC",
      "definition": "2.5cm cyclinders"  
    }, {
      "code": "SC-TYPE-CUBE",
      "definition": "small cubes"  
    }, {
      "code": "SC-TYPE-MINI",
      "definition": "Mini-samples or chips"  
    }, {
      "code": "SC-TYPE-SC",
      "definition": "Single crystal"  
    }, {
      "code": "SC-TYPE-UC",
      "definition": "U-channel"  
    }, {
      "code": "SC-TYPE-LARGE",
      "definition": "Large Sample Method"    
    }, {
      "code": "SC-UVES",
      "definition": "UV emission spectrography"
    }, {
      "code": "SC-VOL",
      "definition": "Volumetric"
    }, {
      "code": "SC-WET",
      "definition": "Wet chemistry"
    }, {
      "code": "LP-XPEEM",
      "definition": "X‐ray photoelectron emission microscopy",
      "description": "The magnetic contrast is provided by X‐ray magnetic circular dichroism, where the efficiency of electron ejection from the sample's surface by circularly polarized X‐rays depends on the relative orientation of the local magnetic moment and the X‐ray beam. This can be used to calculate the local magnetic moment and paleointensities. (Bryson, Herrero-Albillos et al., 2014)",
      "urls" : ["https://doi.org/10.1016/j.epsl.2014.04.016"]
    }, {
      "code": "SC-XRD",
      "definition": "X-Ray Diffraction"
    }, {
      "code": "SC-XRF",
      "definition": "X-ray fluorescence"
    }, {
      "code": "SC-XRF-EDS",
      "definition": "Energy-dispersive x-ray fluorescence"
    }],
    "label": "Sample Characterization"
  },
  "anisotropy_estimation": {
    "codes": [{
      "code": "AE-BS",
      "definition": "Bootstrap method"
    }, {
      "code": "AE-BS-P",
      "definition": "Bootstrap method: Parametric"
    }, {
      "code": "AE-H",
      "definition": "Hext estimation of anisotropy parameters"
    }],
    "label": "Anisotropy Estimation"
  },
  "stability_tests": {
    "codes": [{
      "IAGA": "C",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#FT-BC"],
      "description": "The baked contact test compares the NRM direction of an igneous intrusion to that of the country rock surrounding it. One expects a changing NRM vector across the heat affected zone of the country rock. When an igneous rock intrudes an older rock formation, the intrusion heats a region of the surrounding country rock and the baked region of the country rock will then cool in the same magnetic field as the intrusion, and so will acquire a direction of magnetization the same as that of the intrusion. Agreement between the direction of magnetization of the intrusion and that of the country rock provides strong evidence for the stability of the magnetization of the intrusion.",
      "code": "ST-C",
      "definition": "Baked contact test"
    }, {
      "urls": ["10.1029/2000JB000050"],
      "description": "Age uncertainties of < ± 15 Myr.",
      "code": "ST-BCQ-1",
      "definition": "Besse and Courtillot Quality Factor 1"
    }, {
      "urls": ["10.1029/2000JB000050"],
      "description": "There must be a sufficient number of individually oriented samples from enough sites. At least six sites and 36 samples, each site having a 95% confidence interval less than 10∘ in the Cenozoic and 15∘ in the Mesozoic.",
      "code": "ST-BCQ-2",
      "definition": "Besse and Courtillot Quality Factor 2"
    }, {
      "urls": ["10.1029/2000JB000050"],
      "description": "It must be demonstrated that a coherent characteristic remanence component has been isolated by the demagnetization procedure. McElhinny and McFadden (2000) attempted to standardize the description of the demagnetization status of a dataset using a demagnetization code (DC). Besse and Couttillot 2002 recommend using only poles with a DC of at least 2.",
      "code": "ST-BCQ-3",
      "definition": "Besse and Courtillot Quality Factor 3"
    }, {
      "urls": ["10.1029/2000JB000050"],
      "description": "The age of the magnetization relative to the age of the rock should be constrained using field tests (fold test, conglomerate test, baked contact test. Reject poles that fail a fold test or a reversals test.",
      "code": "ST-BCQ-4",
      "definition": "Besse and Courtillot Quality Factor 4"
    }, {
      "urls": ["10.1029/2000JB000050"],
      "description": "There should be agreement in the pole positions from units of similar age from a broad region and adequate knowledge of any structural corrections necessary. Reject poles from “mobile regions”, but incorporate data that are azimuthally unconstrained by using inclination only data as a constraint on paleolatitude.",
      "code": "ST-BCQ-5",
      "definition": "Besse and Courtillot Quality Factor 5"
    }, {
      "IAGA": "G",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/WebBook3ch9.html#FT-CT"],
      "description": "The conglomerate test compares the NRM direction of conglomerate clasts to the matrix (host particles) NRM direction. This results in directions that are random relative to the matrix, or directions clustering around the matrix particle's vector mean. If the directions of the magnetization of the conglomerate cobbles are random then this suggests that the magnetization of the parent formation has been stable since the deposition of the conglomerate.",
      "code": "ST-G",
      "definition": "Conglomerate test"
    }, {
      "code": "ST-F",
      "definition": "Fold test"
    }, {
      "IAGA": "F",
      "description": "This fold test compares the precision parameter (kappa) of the NRM directions across a fold before and after fold correction (unfolding). The positive result signifies an improved precision (kappa) about the vector mean, resulting in less dispersion. Samples are taken from different limbs of a fold. If the in situ directions of magnetization on the separate limbs differ, but agree after unfolding the limbs towards the horizontal, then the magnetization must predate the folding and must have been stable since that time.",
      "code": "ST-F-1",
      "definition": "Fold test 1: Compares Kappa before and after tilt correction"
    }, {
      "IAGA": "F*",
      "description": "This fold test is a comparison of precisions (kappa) between different fold limbs (groups) to determine if they could have been drawn from a common group. An estimated ratio of k1/k2 far from unity is interpreted to imply significantly different distributions, where the critical value is being determined by F-test distributions. If the observed value of <f> exceeds the critical value of the F distribution at the required level of significance, then the hypothesis of a common true mean may be rejected. In other words, the sites on each limb may be considered as a separate group with each group having it's own common tilt correction.",
      "code": "ST-F-2",
      "definition": "Fold test 2: Compares distributions of directions from various limbs of folds before and after tilt correction"
    }, {
      "IAGA": "F*",
      "description": "This fold test is used to determine if there is no common precision (kappa) between groups by using Watson's V statistic compared to a simulated random distribution. If there is not a common kappa and there are multiple sites on each limb, then it is still possible to make use of this V-test. If the null hypothesis of a common mean direction can be rejected in the in situ position, but not in the unfolded position, then this is evidence that the magnetization was acquired before the folding occurred.",
      "code": "ST-F-3",
      "definition": "Fold test 3: Uses Watson's V to test for common mean after tilt correction"
    }, {
      "IAGA": "F*",
      "code": "ST-F-4",
      "definition": "Fold test 4: Estimates confidence on Kappa as a function of tilt correction"
    }, {
      "IAGA": "F*",
      "description": "In this fold test the behavior of the eigenvalue t1 is examined during unfolding to find the point at which the tightest grouping is achieved. Because in the orientation matrix the polarity does not play a role and because the tightness of groupings is reflected in the relative magnitudes of the eigenvalues(t), we can predict that the variance along the principal axis grows and those along the other axis shrinks, as the data become more tightly grouped.",
      "code": "ST-F-5",
      "definition": "Fold test 5: Estimates confidence on maximum eigenvalue as a function of tilt correction"
    }, {
      "IAGA": "C*",
      "description": "This is the inverse of the baked contact test. If stable magnetizations are observed in unbaked rocks that provide positive evidence for a baked contact test, then this also provides evidence that the unbaked sediments have retained their magnetization, at least since the time of baking.",
      "code": "ST-C-I",
      "definition": "Inverse contact test"
    }, {
      "IAGA": "G*",
      "description": "This is a variation on the conglomerate test, where the conglomerate lies within the formation and was deposited not long after the parent beds were deposited.",
      "code": "ST-G-IF",
      "definition": "Intraformational conglomerate test"
    }, {
      "code": "ST-R",
      "definition": "Reversals test"
    }, {
      "IAGA": "R",
      "description": "This reversal test compares the normal and reverse directions, that are flipped 180 degrees, for a common mean. Originally the simple procedure was to invert one of the directions by 180 degrees and then test if the resulting two directions of magnetization were discernibly different, by testing for common kappa. However, this method is taken to be flawed, because the larger the circles of confidence the harder it would be to show the two directions were discernibly different from one another.",
      "code": "ST-R-1",
      "definition": "Reversals test 1: Compares N and antipodes of R directions by testing for common mean"
    }, {
      "IAGA": "R",
      "description": "This reversal test compares the means of the normal and reversed data, and assesses the quality using Watson's V-statistic to test whether the two samples could have been drawn from distributions sharing a common mean direction, depend on the number of observations in each sample and whether the two distributions share a common precision. Results can be classified as 'A' if γc <= 5°, 'B' if 5° <= γc <= 10°, or 'C' if 10° <= γc <= 20°, and indeterminate if γc > 20°.",
      "code": "ST-R-2",
      "definition": "Reversals test 2: Compares Watson's V statistic for normal and reverse modes with monte carlo simulation"
    }, {
      "IAGA": "R",
      "description": "This reversal test compares the overlap of confidence intervals for bootstrapped means of reversed antipodal data. If the confidence intervals for the normal and reversed data overlap, then this suggests that the two means cannot be distinguished at the 95% level of confidence.",
      "code": "ST-R-3",
      "definition": "Reversals test 3: Compares bootstrapped means for N and R antipodes by testing for common mean"
    }, {
      "IAGA": "R",
      "code": "ST-R-4",
      "definition": "Reversals test 4: Defines degree of Alpha95 overlap for N and R antipodes"
    }, {
      "IAGA": "U",
      "description": "This unconformity test is applied in special cases when successive zones of normal and reverse magnetization are truncated by an unconformity in the sequence. If the polarity zones of the upper/younger sequence do not match those of the lower/older sequence, then the magnetization of the lower beds is older than the episode of erosion that created the unconformity.",
      "code": "ST-U",
      "definition": "Unconformity test"
    }, {
      "urls": ["http://dx.doi.org/10.1029/rg028i002p00167"],
      "description": "The age of the formation must be known rather accurately. The age should be known to within a half of a geological period or within a numerical age of ± 4% for Phanerozoic data. For Precambrian rocks, the age should be known to within ± 4% or 40 Myr, whichever is smaller.",
      "code": "ST-VVQ-1",
      "definition": "Van der Voo Quality Factor 1"
    }, {
      "urls": ["http://dx.doi.org/10.1029/rg028i002p00167"],
      "description": "There must be a sufficient number of individually oriented samples from enough sites. A minimum of 24 discrete samples of the geomagnetic field each having a κ > 10.",
      "code": "ST-VVQ-2",
      "definition": "Van der Voo Quality Factor 2"
    }, {
      "urls": ["http://dx.doi.org/10.1029/rg028i002p00167"],
      "description": "It must be demonstrated that a coherent characteristic remanence component has been isolated by the demagnetization procedure.",
      "code": "ST-VVQ-3",
      "definition": "Van der Voo Quality Factor 3"
    }, {
      "urls": ["http://dx.doi.org/10.1029/rg028i002p00167"],
      "description": "The age of the magnetization relative to the age of the rock should be constrained using field tests (fold test, conglomerate test, baked contact test).",
      "code": "ST-VVQ-4",
      "definition": "Van der Voo Quality Factor 4"
    }, {
      "urls": ["http://dx.doi.org/10.1029/rg028i002p00167"],
      "description": "There should be agreement in the pole positions from units of similar age from a broad region and adequate knowledge of any structural corrections necessary.",
      "code": "ST-VVQ-5",
      "definition": "Van der Voo Quality Factor 5"
    }, {
      "urls": ["http://dx.doi.org/10.1029/rg028i002p00167"],
      "description": "Both polarities should be represented and the two data sets should be antipodal.",
      "code": "ST-VVQ-6",
      "definition": "Van der Voo Quality Factor 6"
    }, {
      "urls": ["http://dx.doi.org/10.1029/rg028i002p00167"],
      "description": "Pole positions should not fall on a younger part of the pole path or on the present field direction.",
      "code": "ST-VVQ-7",
      "definition": "Van der Voo Quality Factor 7"
    }],
    "label": "Stability Tests"
  },
  "statistical_method": {
    "codes": [{
      "code": "SM-1D",
      "definition": "First derivative"
    }, {
      "code": "SM-1DMAX",
      "definition": "Maximum on first derivative"
    }, {
      "code": "SM-1DZERO",
      "definition": "Zero on first derivative"
    }, {
      "code": "SM-2D",
      "definition": "Second derivative"
    }, {
      "code": "SM-2DMAX",
      "definition": "Maximum on second derivative"
    }, {
      "code": "SM-2DZERO",
      "definition": "Zero on second derivative"
    }, {
      "code": "SM-2TAN",
      "definition": "Two tangents"
    }, {
      "code": "SM-AVE",
      "definition": "Arithmetic mean"
    }, {
      "code": "SM-AVEDEV",
      "definition": "Average of the absolute deviations of data points from their mean"
    }, {
      "code": "SM-BOOT",
      "definition": "Bootstrap"
    }, {
      "code": "SM-BOOT-67",
      "definition": "Bootstrap with 67% confidence bounds"
    }, {
      "code": "SM-BOOT-95",
      "definition": "Bootstrap with 95% confidence bounds"
    }, {
      "code": "SM-BOOT-PAR",
      "definition": "Parametric bootstrap"
    }, {
      "code": "SM-BOOT-PAR-67",
      "definition": "Parametric bootstrap with 67% confidence bounds"
    }, {
      "code": "SM-BOOT-PAR-95",
      "definition": "Parametric bootstrap with 95% confidence bounds"
    }, {
      "code": "SM-BS",
      "definition": "Background subtraction"
    }, {
      "code": "SM-CHITEST",
      "definition": "Test for independence"
    }, {
      "code": "SM-COVAR",
      "definition": "Covariance"
    }, {
      "code": "SM-DEVSQ",
      "definition": "Sum of squares of deviations"
    }, {
      "code": "SM-DIG-GRAPH",
      "definition": "Digitization of data from diagrams and plots"
    }, {
      "code": "SM-EXT",
      "definition": "Extrapolation"
    }, {
      "description": "Linear temperature dependence of inverse susceptibility above ordering temperature of ferromagnets.",
      "code": "SM-EXT-LIN",
      "definition": "Linear extrapolation from above critical temperature"
    }, {
      "description": "Hyperbolic temperature dependence of inverse susceptibility above ordering temperature of ferromagnets.",
      "code": "SM-EXT-NL1",
      "definition": "Non-linear extrapolation from above critical temperature"
    }, {
      "description": "Theoretical decay of Ms versus T to estimate Curie temperature.",
      "code": "SM-EXT-NL2",
      "definition": "Non-linear extrapolation from below critical temperature"
    }, {
      "code": "SM-EYE",
      "definition": "Eyeball estimation"
    }, {
      "code": "SM-FISHER",
      "definition": "Fisher transformation"
    }, {
      "code": "SM-FISHER-INV",
      "definition": "Inverse Fisher transformation"
    }, {
      "code": "SM-FTEST",
      "definition": "Statistical F-test"
    }, {
      "code": "SM-GEOMEAN",
      "definition": "Geometric mean"
    }, {
      "code": "SM-HARMEAN",
      "definition": "Harmonic mean"
    }, {
      "code": "SM-INT",
      "definition": "Interpolation"
    }, {
      "code": "SM-KURT",
      "definition": "Kurtosis"
    }, {
      "code": "SM-MEDIAN",
      "definition": "Median of the given numbers"
    }, {
      "code": "SM-MODE",
      "definition": "Most common value in a data set"
    }, {
      "code": "SM-PEARSON",
      "definition": "Pearson product moment correlation coefficient"
    }, {
      "code": "SM-QUARTILE",
      "definition": "Quartile of a data set"
    }, {
      "code": "SM-R2",
      "definition": "Correlation coefficient R2"
    }, {
      "code": "SM-REG-LIN",
      "definition": "Regression: First order or linear"
    }, {
      "code": "SM-REG-POLY",
      "definition": "Regression: High order polynomial"
    }, {
      "code": "SM-REG-QDR",
      "definition": "Regression: Second order or quadratical"
    }, {
      "code": "SM-RSQ",
      "definition": "Square of the Pearson product moment correlation coefficient"
    }, {
      "code": "SM-SKEW",
      "definition": "Skewness of a distribution"
    }, {
      "code": "SM-SLOPE",
      "definition": "Slope of the linear regression line"
    }, {
      "code": "SM-STDEV",
      "definition": "Standard deviation"
    }, {
      "code": "SM-STDEV-OPT",
      "definition": null
    }, {
      "code": "SM-TTEST",
      "definition": "Student's t-test"
    }, {
      "code": "SM-VAR",
      "definition": "Variance"
    }, {
      "code": "SM-WF",
      "definition": "Calculation of the weighting factor for site intensity average"
    }, {
      "code": "SM-YORK",
      "definition": "Weighted linear regression by variance"
    }, {
      "code": "SM-ZTEST",
      "definition": "Z-test"
    }],
    "label": "Statistical Method"
  },
  "data_adjustment": {
    "codes": [{
      "code": "DA-AC",
      "definition": "Anisotropy correction"
    }, {
      "code": "DA-AC-AARM",
      "definition": "Anisotropy correction: Tensor of AARM"
    }, {
      "code": "DA-AC-AATR",
      "definition": "Anisotropy correction: Tensor of AATR"
    }, {
      "code": "DA-AC-AIRM",
      "definition": "Anisotropy correction: Tensor of AIRM"
    }, {
      "code": "DA-AC-AMS",
      "definition": "Anisotropy correction: Tensor of AMS"
    }, {
      "code": "DA-AC-ATRM",
      "definition": "Anisotropy correction: Tensor of ATRM"
    }, {
      "code": "DA-AC-B",
      "definition": "Anisotropy correction: Burakov's TRM correction"
    }, {
      "code": "DA-AC-NN",
      "definition": "Anisotropy correction: Tested for anisotropy correction but none needed and not applied"
    }, {
      "code": "DA-AC-ROT",
      "definition": "Anisotropy correction: Rotation tensor applied as given in rotation_sequence"
    }, {
      "code": "DA-AC-TILT",
      "definition": "Anisotropy correction: Adjusted for tilt - bed_dip and bed_dip_direction column values applied"
    }, {
      "code": "DA-AC-TILT1",
      "definition": "Anisotropy correction: Adjusted for tilt - rotation_sequence trend and plunge (TP) applied and then bed_dip and bed_dip_direction column values applied"
    }, {
      "code": "DA-AC-TILT2",
      "definition": "Anisotropy correction: Adjusted for tilt - alternative rotation_sequence bed dip and bed dip direction (DD1)"
    }, {
      "code": "DA-AC-TILT3",
      "definition": "Anisotropy correction: Adjusted for tilt - rotation_sequence alternative trend and plunge (TP1) applied and then alternative rotation_sequence bed dip and bed dip direction(DD1) applied"
    }, {
      "code": "DA-ALT",
      "definition": "Alteration correction"
    }, {
      "code": "DA-ALT-BN",
      "definition": "Alteration correction: Burakov & Nachasova"
    }, {
      "code": "DA-ALT-K",
      "definition": "Alteration correction: Kono"
    }, {
      "code": "DA-ALT-RS",
      "definition": "Alteration correction: Rolph & Shaw"
    }, {
      "code": "DA-ALT-V",
      "definition": "Alteration correction: Corrections using pTRM-check"
    }, {
      "code": "DA-CR",
      "definition": "Cooling rate correction",
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1180067"]
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1180067"],
      "code": "DA-CR-EG",
      "definition": "Cooling rate correction: Educated guess"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1180067"],
      "code": "DA-CR-PS",
      "definition": "Cooling rate correction: Percent estimated from pilot samples"
    }, {
      "urls": ["https://earthref.org/MagIC/books/Tauxe/Essentials/#x1-1180067"],
      "code": "DA-CR-TRM",
      "definition": "Cooling rate correction: Comparison between 2 TRMs acquired with a slow and rapid cooling rate"
    }, {
      "code": "DA-DC",
      "definition": "Deconvolution"
    }, {
      "code": "DA-DIR",
      "definition": "Direction correction"
    }, {
      "code": "DA-DIR-DT",
      "definition": "Direction correction: Detrending of directional data from a sediment core"
    }, {
      "code": "DA-DIR-FLAT",
      "definition": "Direction correction: Flattening correction"
    }, {  
      "code": "DA-DIR-FLAT-EI",
      "definition": "Direction correction: Flattening correction: Elongation/Inclination based - Tauxe and Kent (2004); DOI:10.1029/145GM08 "
    }, {
      "code": "DA-DIR-FLAT-EMP",
      "definition": "Direction correction: Flattening correction: Empirical - Jackson et al. (1991); DOI:10.1111/j.1365-246X.1991.tb02496.x"  
    }, {
      "code": "DA-DIR-FLAT-EST",
      "definition": "Direction correction: Flattening correction: Estimated - Domeier et al. (2011); DOI:10.1016/j.tecto.2011.08.016"
    }, {
      "code": "DA-DIR-GEO",
      "definition": "Direction correction: Adjusted for sample orientation"
    }, {
      "code": "DA-DIR-H",
      "definition": "Direction correction: Data adjustment to the horizontal"
    }, {
      "code": "DA-DIR-INC",
      "definition": "Direction correction: Inclination correction"
    }, {
      "code": "DA-DIR-ROG",
      "definition": "Direction correction: Model of the easy plane of magnetization"
    }, {
      "code": "DA-DIR-ROT",
      "definition": "Direction correction: Rotation tensor applied as given in rotation_sequence"
    }, {
      "code": "DA-DIR-TILT",
      "definition": "Direction correction: Adjusted for tilt - bed_dip and bed_dip_direction column values applied"
    }, {
      "code": "DA-DIR-TILT1",
      "definition": "Direction correction: Adjusted for tilt - rotation_sequence trend and plunge (TP) applied and then bed_dip and bed_dip_direction column values applied"
    }, {
      "code": "DA-DIR-TILT2",
      "definition": "Direction correction: Adjusted for tilt - alternative rotation_sequence bed dip and bed dip direction (DD1)"
    }, {
      "code": "DA-DIR-TILT3",
      "definition": "Direction correction: Adjusted for tilt - rotation_sequence alternative trend and plunge (TP1) applied and then alternative rotation_sequence bed dip and bed dip direction(DD1) applied"
    }, {
      "code": "DA-DIR-V",
      "definition": "Direction correction: Data adjustment to the vertical"
    }, {
      "code": "DA-HYST-JS",
      "definition": "Isolation of ferromagnetic loop according to protocol of Jackson and Solheid (2010)"
    }, {
      "code": "DA-HYST-LD",
      "definition": "Linear detrending in hysteresis loop"
    }, {
      "code": "DA-NL",
      "definition": "Non-linear correction: Selkin's TRM correction"
    }, {
      "code": "DA-NO",
      "definition": "Unknown correction"
    }, {
      "code": "DA-VRM",
      "definition": "VRM correction"
    }, {
      "code": "DA-X-HOLD",
      "definition": "Susceptibility corrected for the sample holder"
    }, {
      "code": "DA-X-THERMO",
      "definition": "Susceptibility corrected for the thermocouple"
    }],
    "label": "Data Adjustment"
  }
};
