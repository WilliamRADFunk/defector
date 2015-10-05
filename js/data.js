/* Semi-constant variables    */
var WALL_HEIGHT = 15;
var STRIDE = 0.7;
var SCENE_WIDTH = 200, SCENE_HEIGHT = 200;
var UNIT_SIZE = 10;
var BOUNDARY_DISTANCE = (UNIT_SIZE / 2) - 0.5;
var START_COORDS = [];
var LEVEL = 0;
var LEVEL_MAX = 0;
/* Semi-constant variables    */

/* THREE.JS Variables         */
var world = [];
var scene;
var renderer, renderer2;
var camera, miniMapCamera;
var player;
var walls;
var floor;
var ceiling;
var startPoint;
var elevator;
var computer;
var disks = [];
var enemies = [];
var disksCollected = 0;
var disksCollectedOverall = 0;
var totalDisks = 0;
/* THREE.JS Variables         */

/* Sound variables            */
var countdown;
var datanode;
var footsteps;
var music;
/* Sound variables            */

/* Counters & flags           */
var updateCounter = 0;
var timer = 86940;
var modalFlag = false;
var gameFlag = true;
/* Counters                   */

/* Scene Generation Variables */
var map1 = [// 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 00
		   [1, 0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,  2,  0,  2,  0,  0,  0,  1], // 01
		   [1, 0,  2,  0,  2,  2,  2,  0,  2,  2,  2,  2,  0,  2,  0,  2,  0,  2,  0,  1], // 02
		   [1, 0,  2,  0,  0,  0,  2,  0,  2,  0,  0,  2,  0,  2,  0,  0,  0,  2,  0,  1], // 03
		   [1, 0,  2,  0,  2,  0,  2,  0,  2,  0,  0,  2,  0,  2,  0,  2,  0,  2,  0,  1], // 04
		   [1, 0,  2,  0,  2,  0,  2,  0,  2,  0,  2,  2,  0,  2,  0,  2,  0,  2,  9,  1], // 05
		   [1, 0,  0,  0,  2,  0,  0,  0,  2,  0,  7,  2,  0,  2,  2,  2,  0,  2,  2,  1], // 06
		   [1, 0,  2,  0,  2,  2,  2,  0,  2,  0,  0,  2,  0,  0,  0,  0,  0,  0,  0,  1], // 07
		   [1, 0,  2,  0,  2,  0,  2,  0,  2,  0,  2,  2,  2,  2,  0,  2,  0,  2,  0,  1], // 08
		   [1, 0,  2,  0,  2,  0,  2,  0,  2,  0,  0,  0,  0,  2,  0,  2,  0,  2,  0,  1], // 09
		   [1, 2,  2,  2,  2,  0,  2,  0,  2,  0,  2,  2,  0,  2,  0,  2,  0,  2,  0,  1], // 10
		   [1, 0,  0,  0,  2,  0,  2,  0,  0,  0,  0,  2,  0,  2,  0,  2,  2,  2,  0,  1], // 11
		   [1, 0,  2,  0,  2,  0,  2,  2,  2,  0,  0,  2,  0,  2,  0,  2,  0,  2,  2,  1], // 12
		   [1, 0,  2,  0,  2,  0,  2,  0,  0,  0,  2,  2,  0,  2,  0,  2,  0,  2,  0,  1], // 13
		   [1, 0,  2,  0,  0,  0,  2,  0,  2,  0,  0,  2,  0,  2,  0,  2,  0,  2,  0,  1], // 14
		   [1, 0,  2,  0,  2,  0,  2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  2,  0,  1], // 15
		   [1, 0,  2,  0,  2,  0,  2,  0,  2,  2,  2,  0,  2,  0,  2,  2,  0,  2,  0,  1], // 16
		   [1, 0,  2,  0,  2,  2,  2,  0,  2,  2,  2,  0,  2,  0,  2,  2,  0,  2,  0,  1], // 17
		   [1, 8,  2,  0,  0,  0,  0,  0,  2,  2,  2,  0,  2,  0,  0,  0,  0,  0,  0,  1], // 18
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 19
		   ], mapWidth = map1.length, mapHeight = map1[0].length;

var map2 = [// 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 00
		   [1, 0,  0,  0,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  0,  0,  1], // 01
		   [1, 0,  0,  3,  0,  0,  0,  3,  0,  3,  0,  3,  0,  3,  0,  0,  0,  3,  0,  1], // 02
		   [1, 3,  3,  3,  0,  3,  3,  3,  0,  3,  0,  3,  0,  0,  0,  3,  0,  3,  0,  1], // 03
		   [1, 0,  0,  3,  0,  0,  0,  3,  0,  3,  0,  0,  0,  3,  0,  3,  0,  3,  0,  1], // 04
		   [1, 0,  0,  0,  0,  3,  0,  3,  0,  0,  0,  3,  0,  0,  0,  3,  0,  3,  0,  1], // 05
		   [1, 3,  3,  3,  0,  3,  3,  3,  0,  3,  3,  3,  3,  0,  3,  3,  3,  3,  0,  1], // 06
		   [1, 0,  0,  0,  0,  0,  0,  0,  0,  3,  0,  0,  0,  0,  0,  0,  0,  3,  0,  1], // 07
		   [1, 0,  0,  3,  0,  3,  3,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  9,  1], // 08
		   [1, 3,  3,  3,  0,  3,  3,  3,  0,  3,  0,  3,  0,  0,  0,  3,  0,  3,  3,  1], // 09
		   [1, 0,  0,  3,  0,  3,  0,  3,  0,  7,  0,  3,  3,  3,  3,  3,  0,  0,  0,  1], // 10
		   [1, 0,  0,  0,  0,  0,  0,  3,  0,  3,  0,  3,  0,  0,  0,  3,  0,  3,  0,  1], // 11
		   [1, 3,  3,  3,  0,  3,  3,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  1], // 12
		   [1, 3,  3,  3,  0,  3,  0,  3,  0,  3,  0,  0,  0,  0,  0,  0,  0,  3,  0,  1], // 13
		   [1, 0,  0,  0,  0,  0,  0,  3,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  0,  1], // 14
		   [1, 0,  0,  3,  0,  3,  3,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], // 15
		   [1, 3,  3,  3,  0,  3,  3,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  1], // 16
		   [1, 0,  0,  0,  0,  0,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  1], // 17
		   [1, 8,  3,  3,  0,  3,  0,  3,  0,  3,  0,  0,  0,  3,  0,  0,  0,  3,  7,  1], // 18
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 19
		   ];

var map3 = [// 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 00
		   [1, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  1], // 01
		   [1, 0,  4,  4,  4,  4,  4,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  1], // 02
		   [1, 0,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  1], // 03
		   [1, 0,  4,  0,  4,  4,  4,  4,  4,  4,  4,  0,  4,  4,  4,  4,  0,  4,  0,  1], // 04
		   [1, 0,  4,  0,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  4,  0,  1], // 05
		   [1, 0,  0,  0,  4,  0,  4,  4,  4,  4,  4,  4,  4,  4,  0,  4,  0,  4,  0,  1], // 06
		   [1, 0,  4,  0,  4,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  4,  0,  4,  0,  1], // 07
		   [1, 0,  4,  0,  4,  0,  4,  0,  4,  0,  4,  4,  0,  4,  0,  4,  0,  4,  0,  1], // 08
		   [1, 0,  4,  0,  4,  0,  4,  0,  4,  0,  4,  4,  0,  4,  0,  4,  0,  4,  0,  1], // 09
		   [1, 0,  4,  0,  4,  0,  4,  0,  4,  7,  0,  4,  9,  4,  0,  4,  0,  4,  0,  1], // 10
		   [1, 0,  4,  0,  4,  0,  4,  0,  4,  4,  4,  4,  4,  4,  0,  4,  0,  4,  0,  1], // 11
		   [1, 0,  4,  0,  0,  0,  4,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  4,  0,  1], // 12
		   [1, 0,  4,  0,  4,  0,  4,  4,  4,  4,  4,  4,  0,  4,  4,  4,  0,  4,  0,  1], // 13
		   [1, 0,  4,  0,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  1], // 14
		   [1, 0,  4,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  1], // 15
		   [1, 0,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], // 16
		   [1, 0,  4,  4,  4,  4,  0,  4,  4,  4,  4,  4,  4,  4,  0,  4,  4,  4,  4,  1], // 17
		   [1, 8,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], // 18
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 19
		   ];

var map4 = [// 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 00
		   [1, 7,  0,  0,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  7,  1], // 01
		   [1, 0,  5,  5,  0,  0,  0,  5,  0,  0,  0,  0,  0,  5,  0,  0,  0,  5,  0,  1], // 02
		   [1, 0,  0,  0,  0,  5,  0,  0,  0,  5,  0,  5,  0,  0,  0,  5,  0,  0,  0,  1], // 03
		   [1, 0,  5,  5,  0,  5,  0,  5,  0,  0,  0,  0,  0,  5,  0,  0,  0,  5,  0,  1], // 04
		   [1, 0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  1], // 05
		   [1, 0,  5,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], // 06
		   [1, 0,  0,  0,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  1], // 07
		   [1, 0,  5,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  0,  0,  5,  0,  1], // 08
		   [1, 0,  0,  0,  0,  5,  0,  5,  0,  5,  8,  5,  0,  0,  0,  5,  0,  0,  5,  1], // 09
		   [1, 0,  5,  5,  0,  5,  0,  0,  0,  5,  5,  5,  0,  0,  0,  5,  0,  0,  5,  1], // 10
		   [1, 0,  0,  0,  0,  0,  0,  5,  0,  0,  0,  0,  0,  5,  0,  0,  0,  5,  0,  1], // 11
		   [1, 0,  5,  5,  0,  5,  0,  0,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  1], // 12
		   [1, 0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], // 13
		   [1, 0,  5,  5,  0,  0,  0,  0,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  1], // 14
		   [1, 0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  5,  0,  0,  0,  5,  0,  1], // 15
		   [1, 0,  5,  0,  0,  5,  0,  0,  0,  5,  0,  5,  0,  0,  0,  5,  0,  0,  0,  1], // 16
		   [1, 0,  5,  5,  0,  0,  0,  5,  0,  0,  0,  0,  0,  5,  0,  0,  0,  5,  0,  1], // 17
		   [1, 7,  0,  0,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  0,  5,  9,  1], // 18
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 19
		   ];

var map5 = [// 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 00
		   [1, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1], // 01
		   [1, 0,  6,  6,  0,  0,  6,  6,  6,  0,  6,  0,  6,  6,  0,  0,  0,  6,  0,  1], // 02
		   [1, 0,  6,  6,  6,  0,  0,  6,  6,  0,  6,  0,  6,  0,  0,  0,  6,  6,  0,  1], // 03
		   [1, 0,  0,  0,  6,  6,  0,  0,  0,  0,  6,  0,  0,  6,  6,  6,  6,  0,  0,  1], // 04
		   [1, 0,  6,  0,  0,  6,  6,  6,  6,  0,  6,  0,  6,  6,  6,  6,  0,  0,  0,  1], // 05
		   [1, 0,  6,  6,  0,  0,  6,  0,  0,  0,  6,  0,  6,  6,  6,  0,  0,  6,  0,  1], // 06
		   [1, 0,  0,  0,  0,  0,  0,  0,  0,  7,  7,  7,  0,  0,  0,  0,  0,  0,  0,  1], // 07
		   [1, 0,  6,  6,  6,  6,  6,  6,  0,  6,  10, 6,  0,  6,  6,  6,  6,  6,  0,  1], // 08
		   [1, 0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  0,  0,  0,  0,  0,  0,  0,  1], // 09
		   [1, 0,  6,  6,  0,  0,  6,  6,  0,  0,  7,  0,  0,  6,  0,  6,  6,  0,  0,  1], // 10
		   [1, 0,  6,  0,  0,  6,  6,  6,  0,  0,  6,  0,  0,  6,  0,  0,  6,  6,  0,  1], // 11
		   [1, 0,  0,  0,  6,  6,  6,  0,  0,  0,  6,  0,  0,  0,  6,  0,  0,  6,  0,  1], // 12
		   [1, 0,  0,  6,  6,  6,  0,  0,  6,  0,  6,  0,  0,  0,  6,  6,  0,  0,  0,  1], // 13
		   [1, 0,  6,  6,  6,  0,  0,  6,  6,  0,  6,  0,  0,  6,  0,  6,  6,  0,  0,  1], // 14
		   [1, 0,  6,  6,  0,  0,  6,  6,  0,  0,  6,  0,  0,  6,  0,  0,  6,  6,  0,  1], // 15
		   [1, 0,  6,  0,  0,  6,  6,  0,  0,  0,  6,  0,  0,  0,  6,  0,  0,  6,  0,  1], // 16
		   [1, 0,  0,  0,  6,  6,  0,  0,  6,  0,  6,  0,  6,  0,  0,  6,  0,  0,  0,  1], // 17
		   [1, 8,  6,  0,  0,  0,  0,  0,  6,  0,  0,  0,  6,  0,  0,  0,  0,  0,  0,  1], // 18
		   [1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 19
		   ];

var maps = [];
var mapBlockedAreas = [];
var availableMoves = [];
/* Scene Generation Variables */