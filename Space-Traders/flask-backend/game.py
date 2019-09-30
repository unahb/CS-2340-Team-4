import random

class Game:
    def __init__(self, difficulty):
        self.difficulty = difficulty
        NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Europa']
        TECH_LEVELS = ['PRE-AG', 'AGRICULTURE', 'MEDIEVAL',
                       'RENAISSANCE', 'INDUSTRIAL', 'MODERN', 'FUTURISTIC']

        self.universe = Universe(NAMES, TECH_LEVELS)


class Region:
    def __init__(self, coordinates, tech_level, name):
        self.__coordinates = coordinates # double underscore for private
        self.__tech_level = tech_level
        self.__name = name


class Player:
    def __init__(self, attributes, region):  
        self._attributes = attributes # Pilot, Fighter, Merchant, Engineer
        self._region = region # single underscore for protected

    # getters
    def get_region(self):
        return self._region
    def get_credits(self):
        return self._credits

    # setters
    def set_region(self, x):
        self._region = x
    def set_credits(self, x):
        self._credits = x

class Universe:
    def __init__(self, planets, tech_names):
        # Needs to be singleton (can't make more than 1)
        if Universe.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            self.game_regions = {}

            for name in planets:  # add regions to game_regions
                while True:
                    valid_coordinates = True;
                    x = random.randint(-200, 200)
                    y = random.randint(-200, 200)
                    for name in names:
                        if (self.game_regions[name].coordinates[0]) - x < 5:
                            valid_coordinates = False
                        if (self.game_regions[name].coordinates[1]) - y < 5:
                            valid_coordinates = False
                            
                    if valid_coordinates == True:
                        break                        

                tech = random.randint(1, len(tech_names))
                self.game_regions[name] = Region((x, y), tech_names[tech], planets)