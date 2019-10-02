import random

PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Europa']
TECH_LEVELS = ['PRE-AG', 'AGRICULTURE', 'MEDIEVAL',
               'RENAISSANCE', 'INDUSTRIAL', 'MODERN', 'FUTURISTIC']
CREDITS = {'easy': 2000, 'medium': 1000, 'hard': 500}

class Game:
    def __init__(self, difficulty='easy', attributes=None, name='John Doe'):
        self._difficulty = difficulty
        self._universe = Universe()

        if attributes is None:
            attributes = [1, 1, 1, 1]

        starting_planet = PLANET_NAMES[random.randint(0, len(PLANET_NAMES)-1)]
        self._player = Player(attributes, starting_planet, CREDITS[self._difficulty], name)

        print('New game initialized.')

    def travel(self, region):
        self._player.set_region(region)

    def get_player(self):
        return self._player

    def get_universe(self):
        return self._universe

    def get_difficulty(self):
        return self._difficulty

    def __str__(self):
        builder = ''
        builder += 'Player: ' + str(self._player) + '\n'
        builder += str(self._universe)
        return builder


class Region:
    def __init__(self, coordinates, tech_level, name):
        self.__coordinates = coordinates # double underscore for private
        self.__tech_level = tech_level
        self.__name = name

    def get_coordinates(self):
        return self.__coordinates

    def get_tech_level(self):
        return self.__tech_level

    def get_name(self):
        return self.__name

    def __str__(self):
        builder = ''
        builder += self.__name + ' at ' + str(self.__coordinates)
        return builder


class Player:
    def __init__(self, attributes, region, money, name):
        self._attributes = attributes # [Pilot, Fighter, Merchant, Engineer] (all ints)
        self._region = region # single underscore for protected
        self._credits = money
        self._name = name

    # getters
    def get_region(self):
        return self._region
    def get_credits(self):
        return self._credits
    def get_attributes(self):
        return self._attributes
    def get_name(self):
        return self._name

    # setters
    def set_region(self, region):
        self._region = region
    def set_credits(self, money):
        self._credits = money

    def __str__(self):
        builder = ''
        builder += 'Player is currently at ' + str(self._region) + '\n'
        builder += 'Player attributes currently are: ' + str(self._attributes)
        return builder

class Universe:
    __instance = None
    def __init__(self):
        # Needs to be singleton (can't make more than 1)
        if Universe.__instance is not None:
            raise Exception("This class is a singleton!")

        self.game_regions = {}

        for name in PLANET_NAMES:  # add regions to game_regions
            valid_coordinates = False
            while not valid_coordinates:
                x_coord = random.randint(-200, 200)
                y_coord = random.randint(-200, 200)

                if not self.game_regions:   #pythonic way of checking that a list is empty
                    valid_coordinates = True

                for planet in self.game_regions:
                    if abs(self.game_regions[planet].get_coordinates()[0] - x_coord) > 5:
                        if abs(self.game_regions[planet].get_coordinates()[1] - y_coord) > 5:
                            valid_coordinates = True

            tech = random.randint(1, len(TECH_LEVELS) - 1)
            self.game_regions[name] = Region((x_coord, y_coord), TECH_LEVELS[tech], name)

    def get_game_regions(self):
        return self.game_regions

    def __str__(self):
        builder = 'List of Planets: '
        for planet in self.game_regions:
            builder += str(self.game_regions[planet]) + ' '
        return builder
