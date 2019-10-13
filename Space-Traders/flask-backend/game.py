import random

PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                'Europa', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
TECH_LEVELS = ['PRE-AG', 'AGRICULTURE', 'MEDIEVAL',
               'RENAISSANCE', 'INDUSTRIAL', 'MODERN', 'FUTURISTIC']
CREDITS = {'easy': 2000, 'medium': 1000, 'hard': 500}

class Game:
    def __init__(self, difficulty='easy', attributes=None, name='John Doe'):
        #set parameters to defaults if they aren't correctly formatted
        if difficulty not in ('easy', 'medium', 'hard'):    #difficulty
            difficulty = 'easy'
            print('difficulty set to default')
        if attributes is None or not isinstance(attributes, list):  #attributes
            attributes = [1, 1, 1, 1]
            print('attributes set to default')
        if len(attributes) != 4:
            attributes = [1, 1, 1, 1]
            print('attributes set to default')
        for num in attributes:
            if not isinstance(num, int):
                attributes = [1, 1, 1, 1]
                print('attributes set to default')
                break
        if not isinstance(name, str):   #name
            name = 'John Doe'
            print('name set to default')

        #initialize new game
        self._difficulty = difficulty
        self._universe = Universe()
        starting_planet_name = PLANET_NAMES[random.randint(0, len(PLANET_NAMES) - 1)]
        starting_planet = self._universe.get_game_regions()[starting_planet_name]
        self._player = Player(attributes, starting_planet, CREDITS[self._difficulty], name)

        print('New game initialized with player starting at ', self._player.get_region())
        print('Universe Configuration: ', str(self._universe))

    def travel(self, region):
        self._player.set_region(self._universe.get_game_regions()[region])

    def get_player(self):
        return self._player

    def get_universe(self):
        return self._universe

    def get_difficulty(self):
        return self._difficulty

    def __str__(self):  #mostly for debugging
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
        self._attributes = {} # attributes is [Pilot, Fighter, Merchant, Engineer] (all ints)
        self._attributes['Pilot'] = attributes[0]
        self._attributes['Fighter'] = attributes[1]
        self._attributes['Merchant'] = attributes[2]
        self._attributes['Engineer'] = attributes[3]
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

        self.game_regions = {} #set of Region types (not strings!!!)

        for name in PLANET_NAMES:  # add regions to game_regions with random attributes
            valid_coordinates = False
            while not valid_coordinates:
                x_coord = random.randint(-200, 200)
                y_coord = random.randint(-200, 200)

                if not self.game_regions:   #pythonic way of checking that a list is empty
                    valid_coordinates = True

                for planet in self.game_regions:    #make sure regions are sufficiently far apart
                    if abs(self.game_regions[planet].get_coordinates()[0] - x_coord) > 5:
                        if abs(self.game_regions[planet].get_coordinates()[1] - y_coord) > 5:
                            valid_coordinates = True

            tech = random.randint(0, len(TECH_LEVELS) - 1)
            self.game_regions[name] = Region((x_coord, y_coord), TECH_LEVELS[tech], name)

    def get_game_regions(self):
        print(type(self.game_regions))
        return self.game_regions

    def __str__(self):
        builder = ''
        for planet in self.game_regions:
            builder += str(self.game_regions[planet]) + ' '
        return builder
