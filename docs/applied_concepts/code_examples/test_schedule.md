```python
import random
from itertools import combinations
from collections import Counter

num_teams = 9
# Create teams list
teams = [f"Team {i+1}" for i in range(num_teams)]

# Generate all possible matchups
all_matchups = list(combinations(teams, 2))
# Double the matchups since each team plays each other twice
all_matchups = all_matchups * 2
random.shuffle(all_matchups)
```


```python
all_matchups
```




    [('Team 3', 'Team 6'),
     ('Team 3', 'Team 7'),
     ('Team 5', 'Team 8'),
     ('Team 4', 'Team 5'),
     ('Team 2', 'Team 5'),
     ('Team 1', 'Team 2'),
     ('Team 1', 'Team 8'),
     ('Team 5', 'Team 7'),
     ('Team 3', 'Team 9'),
     ('Team 8', 'Team 9'),
     ('Team 3', 'Team 4'),
     ('Team 1', 'Team 9'),
     ('Team 2', 'Team 5'),
     ('Team 5', 'Team 6'),
     ('Team 2', 'Team 8'),
     ('Team 2', 'Team 9'),
     ('Team 4', 'Team 9'),
     ('Team 1', 'Team 4'),
     ('Team 4', 'Team 9'),
     ('Team 6', 'Team 9'),
     ('Team 3', 'Team 7'),
     ('Team 4', 'Team 7'),
     ('Team 7', 'Team 9'),
     ('Team 4', 'Team 5'),
     ('Team 1', 'Team 8'),
     ('Team 7', 'Team 8'),
     ('Team 1', 'Team 5'),
     ('Team 5', 'Team 7'),
     ('Team 2', 'Team 3'),
     ('Team 1', 'Team 4'),
     ('Team 7', 'Team 9'),
     ('Team 2', 'Team 4'),
     ('Team 6', 'Team 8'),
     ('Team 5', 'Team 9'),
     ('Team 7', 'Team 8'),
     ('Team 3', 'Team 8'),
     ('Team 4', 'Team 8'),
     ('Team 2', 'Team 4'),
     ('Team 3', 'Team 5'),
     ('Team 2', 'Team 7'),
     ('Team 3', 'Team 9'),
     ('Team 1', 'Team 7'),
     ('Team 5', 'Team 9'),
     ('Team 3', 'Team 8'),
     ('Team 6', 'Team 7'),
     ('Team 1', 'Team 9'),
     ('Team 1', 'Team 3'),
     ('Team 3', 'Team 5'),
     ('Team 1', 'Team 7'),
     ('Team 2', 'Team 6'),
     ('Team 5', 'Team 8'),
     ('Team 6', 'Team 9'),
     ('Team 1', 'Team 2'),
     ('Team 2', 'Team 7'),
     ('Team 3', 'Team 6'),
     ('Team 1', 'Team 6'),
     ('Team 4', 'Team 7'),
     ('Team 2', 'Team 6'),
     ('Team 4', 'Team 6'),
     ('Team 2', 'Team 8'),
     ('Team 4', 'Team 8'),
     ('Team 6', 'Team 7'),
     ('Team 1', 'Team 6'),
     ('Team 1', 'Team 3'),
     ('Team 4', 'Team 6'),
     ('Team 3', 'Team 4'),
     ('Team 2', 'Team 3'),
     ('Team 2', 'Team 9'),
     ('Team 5', 'Team 6'),
     ('Team 8', 'Team 9'),
     ('Team 6', 'Team 8'),
     ('Team 1', 'Team 5')]




```python
# Calculate max games per week based on number of teams
max_games_per_week = 8 if num_teams >= 8 else 4

# Organize games into weeks with paired games and rest constraints
schedule = []
remaining_matchups = all_matchups.copy()
max_games_per_week
```




    8




```python


if remaining_matchups:
    week_games = []

    used_teams = set()
    
    # Try to create pairs of games where no team plays in both games of a pair
    while len(week_games) < max_games_per_week and remaining_matchups:
        print("week_games")
        print(week_games)
        # Find a valid game for the current pair
        valid_game_found = False
        for i, (team1, team2) in enumerate(remaining_matchups):
            # Check if neither team has played in the current pair of games
            if team1 not in used_teams and team2 not in used_teams:
                week_games.append((team1, team2))
                used_teams.add(team1)
                used_teams.add(team2)
                remaining_matchups.pop(i)
                valid_game_found = True
                break
        
        # If we couldn't find a valid game for the current pair, move to next pair
        if not valid_game_found:
            # If we're at an odd number of games and can't find a valid pair,
            # it's okay to have a single game
            if len(week_games) % 2 == 0:
                break
    
    if week_games:
        schedule.append(week_games)
```

    week_games
    []
    week_games
    [('Team 3', 'Team 6')]
    week_games
    [('Team 3', 'Team 6'), ('Team 5', 'Team 8')]
    week_games
    [('Team 3', 'Team 6'), ('Team 5', 'Team 8'), ('Team 1', 'Team 2')]
    week_games
    [('Team 3', 'Team 6'), ('Team 5', 'Team 8'), ('Team 1', 'Team 2'), ('Team 4', 'Team 9')]



```python
def print_schedule(schedule):
    print("\nSeason Schedule:")
    print("-" * 40)
    for week_num, week_games in enumerate(schedule, 1):
        print(f"\nWeek {week_num}:")
        for game_num, (team1, team2) in enumerate(week_games, 1):
            print(f"Game {game_num}: {team1} vs {team2}")
        print("-" * 40)

def validate_schedule(schedule, num_teams):
    # Create a Counter to track games between each pair of teams
    matchup_counts = Counter()
    
    # Count all matchups in the schedule
    for week in schedule:
        for team1, team2 in week:
            # Sort teams to ensure consistent counting regardless of order
            matchup = tuple(sorted([team1, team2]))
            matchup_counts[matchup] += 1
    
    # Check if each team plays every other team exactly twice
    teams = [f"Team {i+1}" for i in range(num_teams)]
    expected_matchups = list(combinations(teams, 2))
    
    all_valid = True
    errors = []
    
    # Verify each possible matchup occurs exactly twice
    for matchup in expected_matchups:
        matchup = tuple(sorted(matchup))
        count = matchup_counts[matchup]
        if count != 2:
            all_valid = False
            errors.append(f"{matchup[0]} vs {matchup[1]}: Played {count} times (should be 2)")
    
    return all_valid, errors

def main():
    # Test for each possible number of teams
    for num_teams in [9]:
        print(f"\nGenerating and validating schedule for {num_teams} teams:")
        schedule = generate_schedule(num_teams)
        print_schedule(schedule)
        
        # Validate the schedule
        valid, errors = validate_schedule(schedule, num_teams)
        print("\nSchedule Validation:")
        if valid:
            print("✓ All teams play each other exactly twice")
        else:
            print("✗ Schedule has errors:")
            for error in errors:
                print(f"  - {error}")
        print("-" * 40)

if __name__ == "__main__":
    main()

```

    
    Generating and validating schedule for 9 teams:



    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    Cell In[1], line 57
         54         print("-" * 40)
         56 if __name__ == "__main__":
    ---> 57     main()


    Cell In[1], line 42, in main()
         40 for num_teams in [9]:
         41     print(f"\nGenerating and validating schedule for {num_teams} teams:")
    ---> 42     schedule = generate_schedule(num_teams)
         43     print_schedule(schedule)
         45     # Validate the schedule


    NameError: name 'generate_schedule' is not defined



```python
import random
from itertools import combinations
from collections import Counter

def generate_schedule(num_teams):
    # Create list of teams with custom names for 8 teams
    if num_teams == 8:
        teams = ["Ravens", "Spherely Inept", "Newcastle", "Nice Guys", 
                 "Internacional", "Revolution", "AZ Mix", "Team Flagstaff"]
    else:
        teams = [f"Team {i+1}" for i in range(num_teams)]
    
    # Initialize schedule
    schedule = []
    
    # Create all possible matchups
    all_matchups = list(combinations(teams, 2))
    # Each team needs to play each other team twice
    all_matchups = all_matchups * 2
    
    # Track remaining matchups
    remaining_matchups = all_matchups.copy()
    max_attempts = 10000  # Increase maximum attempts
    attempt = 0
    rotation_index = 0
    
    while remaining_matchups and attempt < max_attempts:
        attempt += 1
        # Instead of shuffling, rotate the list by moving first element to the end
        if rotation_index > 0:
            remaining_matchups = remaining_matchups[rotation_index:] + remaining_matchups[:rotation_index]
        rotation_index = 1  # Move by one position in subsequent iterations
        week_games = [[] for _ in range(4)]  # 4 time slots per week
        teams_per_week = Counter()
        used_teams_per_time = set()
        teams_this_week = set()
        
        # Fill time slots with games
        for time_slot in range(4):
            used_teams_per_time.clear()
            used_teams_per_time.update(team for game in week_games[time_slot] for team in game)
            for game in remaining_matchups[:]:
                team1, team2 = game
                if (team1 not in used_teams_per_time and 
                    team2 not in used_teams_per_time and 
                    teams_per_week[team1] < 2 and 
                    teams_per_week[team2] < 2):
                    week_games[time_slot].append(game)
                    used_teams_per_time.add(team1)
                    used_teams_per_time.add(team2)
                    teams_per_week[team1] += 1
                    teams_per_week[team2] += 1
                    remaining_matchups.remove(game)
                    if len(week_games[time_slot]) == 2:
                        break
        
        # If we found any valid games, add to schedule
        total_games = sum(len(games) for games in week_games)
        if total_games > 0:  # Accept any week with at least one game
            schedule.append(week_games)
        else:
            # Put any removed games back and try again
            for time_slot_games in week_games:
                remaining_matchups.extend(time_slot_games)
    
    if attempt >= max_attempts:
        raise RuntimeError("Could not generate a valid schedule after maximum attempts")
    
    return schedule

def print_schedule(schedule):
    print("\nSeason Schedule:")
    print("-" * 40)
    for week_num, week_games in enumerate(schedule, 1):
        print(f"\nWeek {week_num}:")
        for time_slot, time_games in enumerate(week_games, 1):
            print(f"\nTime Slot {time_slot}:")
            for game_num, (team1, team2) in enumerate(time_games, 1):
                print(f"Game {game_num}: {team1} vs {team2}")
        print("-" * 40)

def validate_schedule(schedule, num_teams):
    # Create a Counter to track games between each pair of teams
    matchup_counts = Counter()
    games_per_week = Counter()
    
    # Count all matchups in the schedule
    for week_games in schedule:
        week_teams = Counter()
        for time_slot_games in week_games:
            for team1, team2 in time_slot_games:
                # Sort teams to ensure consistent counting regardless of order
                matchup = tuple(sorted([team1, team2]))
                matchup_counts[matchup] += 1
                week_teams[team1] += 1
                week_teams[team2] += 1
        
        # Track number of games per team per week
        for team, count in week_teams.items():
            games_per_week[count] += 1
    
    # Check if each team plays every other team exactly twice
    if num_teams == 8:
        teams = ["Ravens", "Spherely Inept", "Newcastle", "Nice Guys", 
                 "Internacional", "Revolution", "AZ Mix", "Team Flagstaff"]
    else:
        teams = [f"Team {i+1}" for i in range(num_teams)]
    expected_matchups = list(combinations(teams, 2))
    
    all_valid = True
    errors = []
    
    # Verify each possible matchup occurs exactly twice
    for matchup in expected_matchups:
        sorted_matchup = tuple(sorted(matchup))
        count = matchup_counts.get(sorted_matchup, 0)
        if count != 2:
            all_valid = False
            errors.append(f"{sorted_matchup[0]} vs {sorted_matchup[1]}: Played {count} times (should be 2)")
    
    # Print distribution of games per week
    total_team_weeks = sum(games_per_week.values())
    print("\nGames per week distribution:")
    for num_games in sorted(games_per_week.keys()):
        percentage = (games_per_week[num_games] / total_team_weeks) * 100
        print(f"Teams playing {num_games} game(s): {games_per_week[num_games]} {percentage:.1f}%")
    
    return all_valid, errors

def main():
    # Test for 8 teams with custom names
    num_teams = 8
    print(f"\nGenerating and validating schedule for {num_teams} teams:")
    schedule = generate_schedule(num_teams)
    print_schedule(schedule)
    
    # Validate the schedule
    valid, errors = validate_schedule(schedule, num_teams)
    print("\nSchedule Validation:")
    if valid:
        print("✓ All teams play each other exactly twice")
    else:
        print("✗ Schedule has errors:")
        for error in errors:
            print(f"  - {error}")
    print("-" * 40)


main()
```

    
    Generating and validating schedule for 8 teams:
    
    Season Schedule:
    ----------------------------------------
    
    Week 1:
    
    Time Slot 1:
    Game 1: Ravens vs Spherely Inept
    Game 2: Newcastle vs Nice Guys
    
    Time Slot 2:
    Game 1: Ravens vs Newcastle
    Game 2: Spherely Inept vs Nice Guys
    
    Time Slot 3:
    Game 1: Internacional vs Revolution
    Game 2: AZ Mix vs Team Flagstaff
    
    Time Slot 4:
    Game 1: Internacional vs AZ Mix
    Game 2: Revolution vs Team Flagstaff
    ----------------------------------------
    
    Week 2:
    
    Time Slot 1:
    Game 1: Ravens vs Internacional
    Game 2: Spherely Inept vs Newcastle
    
    Time Slot 2:
    Game 1: Ravens vs Revolution
    Game 2: Spherely Inept vs Internacional
    
    Time Slot 3:
    Game 1: Newcastle vs Revolution
    Game 2: Nice Guys vs AZ Mix
    
    Time Slot 4:
    Game 1: Nice Guys vs Team Flagstaff
    ----------------------------------------
    
    Week 3:
    
    Time Slot 1:
    Game 1: Ravens vs Team Flagstaff
    Game 2: Spherely Inept vs Revolution
    
    Time Slot 2:
    Game 1: Spherely Inept vs AZ Mix
    Game 2: Newcastle vs Internacional
    
    Time Slot 3:
    Game 1: Newcastle vs AZ Mix
    Game 2: Nice Guys vs Internacional
    
    Time Slot 4:
    Game 1: Nice Guys vs Revolution
    Game 2: Ravens vs Team Flagstaff
    ----------------------------------------
    
    Week 4:
    
    Time Slot 1:
    Game 1: Newcastle vs Team Flagstaff
    Game 2: Revolution vs AZ Mix
    
    Time Slot 2:
    Game 1: Internacional vs Team Flagstaff
    Game 2: Ravens vs Spherely Inept
    
    Time Slot 3:
    Game 1: Ravens vs Newcastle
    Game 2: Spherely Inept vs Nice Guys
    
    Time Slot 4:
    Game 1: Nice Guys vs Internacional
    Game 2: Revolution vs AZ Mix
    ----------------------------------------
    
    Week 5:
    
    Time Slot 1:
    Game 1: Ravens vs Internacional
    Game 2: Spherely Inept vs Newcastle
    
    Time Slot 2:
    Game 1: Ravens vs Revolution
    Game 2: Spherely Inept vs Internacional
    
    Time Slot 3:
    Game 1: Newcastle vs Nice Guys
    Game 2: Revolution vs Team Flagstaff
    
    Time Slot 4:
    Game 1: Nice Guys vs AZ Mix
    ----------------------------------------
    
    Week 6:
    
    Time Slot 1:
    Game 1: Spherely Inept vs Revolution
    Game 2: Newcastle vs Internacional
    
    Time Slot 2:
    Game 1: Spherely Inept vs AZ Mix
    Game 2: Newcastle vs Revolution
    
    Time Slot 3:
    Game 1: Nice Guys vs Team Flagstaff
    Game 2: Internacional vs AZ Mix
    
    Time Slot 4:
    Game 1: Ravens vs Nice Guys
    ----------------------------------------
    
    Week 7:
    
    Time Slot 1:
    Game 1: Newcastle vs AZ Mix
    Game 2: Nice Guys vs Revolution
    
    Time Slot 2:
    Game 1: Newcastle vs Team Flagstaff
    Game 2: Internacional vs Revolution
    
    Time Slot 3:
    Game 1: Internacional vs Team Flagstaff
    Game 2: Ravens vs AZ Mix
    
    Time Slot 4:
    Game 1: Ravens vs Nice Guys
    ----------------------------------------
    
    Week 8:
    
    Time Slot 1:
    Game 1: Spherely Inept vs Team Flagstaff
    Game 2: Ravens vs AZ Mix
    
    Time Slot 2:
    Game 1: Spherely Inept vs Team Flagstaff
    
    Time Slot 3:
    
    Time Slot 4:
    ----------------------------------------
    
    Week 9:
    
    Time Slot 1:
    Game 1: AZ Mix vs Team Flagstaff
    
    Time Slot 2:
    
    Time Slot 3:
    
    Time Slot 4:
    ----------------------------------------
    
    Games per week distribution:
    Teams playing 1 game(s): 10 16.4%
    Teams playing 2 game(s): 51 83.6%
    
    Schedule Validation:
    ✓ All teams play each other exactly twice
    ----------------------------------------



```python
import itertools
import random
from collections import defaultdict

def generate_soccer_schedule(team_names):
    """
    Generate an optimized soccer schedule for 8 teams where:
    - Each team plays every other team exactly twice
    - No team plays more than 2 games per week
    - Minimize teams playing in both slots 1 and 4 in the same week
    - Schedule in the minimum number of weeks
    
    Args:
        team_names: List of 8 team names
        
    Returns:
        A schedule dictionary with week numbers as keys and match details as values
    """
    if len(team_names) != 8:
        raise ValueError("Must provide exactly 8 team names")
    
    # Create all possible matches (each team plays every other team twice)
    all_matches = []
    for team1, team2 in itertools.combinations(team_names, 2):
        # Add home and away games
        all_matches.append((team1, team2))
        all_matches.append((team2, team1))
    
    # Shuffle to get different schedules on each run
    random.shuffle(all_matches)
    
    # Initialize schedule
    schedule = {}
    remaining_matches = all_matches.copy()
    
    # Generate schedule week by week
    week = 1
    while remaining_matches:
        schedule[week] = []
        # Track teams that have already played this week
        teams_playing_this_week = defaultdict(int)
        
        # Track teams in each time slot for this week
        teams_in_slot = defaultdict(set)
        
        # Try to schedule matches this week (up to 8 matches total)
        for slot in range(1, 5):
            for field in range(1, 3):
                if not remaining_matches:
                    break
                
                # Find a valid match for this slot and field
                found_match = False
                for i, match in enumerate(remaining_matches):
                    team1, team2 = match
                    
                    # Check constraints:
                    # 1. Neither team can play more than 2 games per week
                    if teams_playing_this_week[team1] >= 2 or teams_playing_this_week[team2] >= 2:
                        continue
                    
                    # 2. Teams can't play in the same time slot twice
                    if team1 in teams_in_slot[slot] or team2 in teams_in_slot[slot]:
                        continue
                    
                    # 3. Try to avoid having teams play in both slot 1 and slot 4
                    if (slot == 1 and team1 in teams_in_slot[4]) or (slot == 4 and team1 in teams_in_slot[1]):
                        # We can still use this match if there are no better options
                        continue
                    
                    if (slot == 1 and team2 in teams_in_slot[4]) or (slot == 4 and team2 in teams_in_slot[1]):
                        # We can still use this match if there are no better options
                        continue
                    
                    # Valid match found
                    match_details = {
                        "teams": (team1, team2),
                        "slot": slot,
                        "field": field
                    }
                    
                    # Update tracking information
                    teams_playing_this_week[team1] += 1
                    teams_playing_this_week[team2] += 1
                    teams_in_slot[slot].add(team1)
                    teams_in_slot[slot].add(team2)
                    
                    schedule[week].append(match_details)
                    remaining_matches.pop(i)
                    found_match = True
                    break
                
                if not found_match and remaining_matches:
                    # Try again with relaxed constraints on slot 1 and 4
                    for i, match in enumerate(remaining_matches):
                        team1, team2 = match
                        
                        # Still enforce essential constraints
                        if teams_playing_this_week[team1] >= 2 or teams_playing_this_week[team2] >= 2:
                            continue
                        
                        if team1 in teams_in_slot[slot] or team2 in teams_in_slot[slot]:
                            continue
                        
                        # Valid match found with relaxed constraints
                        match_details = {
                            "teams": (team1, team2),
                            "slot": slot,
                            "field": field
                        }
                        
                        teams_playing_this_week[team1] += 1
                        teams_playing_this_week[team2] += 1
                        teams_in_slot[slot].add(team1)
                        teams_in_slot[slot].add(team2)
                        
                        schedule[week].append(match_details)
                        remaining_matches.pop(i)
                        break
        
        # If we couldn't schedule any more matches this week, move to the next week
        if not schedule[week]:
            del schedule[week]
            break
        
        week += 1
    
    # Post-processing: Try to optimize the schedule by swapping time slots
    optimize_time_slots(schedule)
    
    return schedule

def optimize_time_slots(schedule):
    """
    Post-processing optimization to reduce the number of teams playing in both slots 1 and 4.
    This is done by swapping compatible time slots when possible.
    """
    for week, matches in schedule.items():
        # Group matches by time slot
        matches_by_slot = defaultdict(list)
        for match in matches:
            matches_by_slot[match["slot"]].append(match)
        
        # Find teams in slot 1 and slot 4
        teams_in_slot_1 = set()
        teams_in_slot_4 = set()
        
        for match in matches_by_slot[1]:
            teams_in_slot_1.add(match["teams"][0])
            teams_in_slot_1.add(match["teams"][1])
            
        for match in matches_by_slot[4]:
            teams_in_slot_4.add(match["teams"][0])
            teams_in_slot_4.add(match["teams"][1])
        
        # Find conflicting teams (playing in both slots 1 and 4)
        conflicting_teams = teams_in_slot_1.intersection(teams_in_slot_4)
        
        if conflicting_teams:
            # Try swapping with slot 2 or 3
            for alternate_slot in [2, 3]:
                # Get teams in the alternate slot
                teams_in_alt_slot = set()
                for match in matches_by_slot[alternate_slot]:
                    teams_in_alt_slot.add(match["teams"][0])
                    teams_in_alt_slot.add(match["teams"][1])
                
                # Check if we can swap slot 1 with alternate slot
                can_swap_1 = True
                for team in teams_in_slot_1:
                    if team in teams_in_alt_slot:
                        can_swap_1 = False
                        break
                
                # Check if we can swap slot 4 with alternate slot
                can_swap_4 = True
                for team in teams_in_slot_4:
                    if team in teams_in_alt_slot:
                        can_swap_4 = False
                        break
                
                # Perform the swap that resolves more conflicts
                if can_swap_1 and can_swap_4:
                    # Choose which slot to swap based on which resolves more conflicts
                    conflicts_resolved_swap_1 = sum(1 for team in conflicting_teams if team in teams_in_slot_1 and team not in teams_in_alt_slot)
                    conflicts_resolved_swap_4 = sum(1 for team in conflicting_teams if team in teams_in_slot_4 and team not in teams_in_alt_slot)
                    
                    if conflicts_resolved_swap_1 >= conflicts_resolved_swap_4:
                        swap_slots(matches_by_slot, 1, alternate_slot)
                    else:
                        swap_slots(matches_by_slot, 4, alternate_slot)
                    break
                elif can_swap_1:
                    swap_slots(matches_by_slot, 1, alternate_slot)
                    break
                elif can_swap_4:
                    swap_slots(matches_by_slot, 4, alternate_slot)
                    break

def swap_slots(matches_by_slot, slot1, slot2):
    """Swap the time slots of two sets of matches"""
    for match in matches_by_slot[slot1]:
        match["slot"] = slot2
    
    for match in matches_by_slot[slot2]:
        match["slot"] = slot1
    
    # Swap the lists in the dictionary
    matches_by_slot[slot1], matches_by_slot[slot2] = matches_by_slot[slot2], matches_by_slot[slot1]

def print_schedule(schedule, team_names):
    """Print the schedule in a readable format"""
    print("Soccer Schedule for Teams:", ", ".join(team_names))
    print("=" * 60)
    
    for week, matches in sorted(schedule.items()):
        print(f"\nWeek {week}:")
        print("-" * 40)
        
        for match in sorted(matches, key=lambda x: (x["slot"], x["field"])):
            team1, team2 = match["teams"]
            print(f"  Slot {match['slot']}, Field {match['field']}: {team1} vs {team2}")
    
    print("\nSchedule Summary:")
    print(f"Total weeks: {len(schedule)}")
    
    # Count and verify matches per team
    team_matches = defaultdict(int)
    team_weekly_games = defaultdict(lambda: defaultdict(int))
    slot_1_4_conflicts = 0
    conflict_weeks = []
    
    for week, matches in schedule.items():
        teams_in_slot_1 = set()
        teams_in_slot_4 = set()
        
        for match in matches:
            team1, team2 = match["teams"]
            
            # Count matches per team
            team_matches[team1] += 1
            team_matches[team2] += 1
            
            # Count games per team per week
            team_weekly_games[team1][week] += 1
            team_weekly_games[team2][week] += 1
            
            # Track slot 1 and 4 conflicts
            if match["slot"] == 1:
                teams_in_slot_1.add(team1)
                teams_in_slot_1.add(team2)
            elif match["slot"] == 4:
                teams_in_slot_4.add(team1)
                teams_in_slot_4.add(team2)
        
        # Check for teams in both slot 1 and 4
        conflicts = teams_in_slot_1.intersection(teams_in_slot_4)
        if conflicts:
            slot_1_4_conflicts += len(conflicts)
            conflict_weeks.append(week)
            print(f"Week {week}: Teams in both slot 1 and 4: {', '.join(conflicts)}")
    
    print("\nMatches per team:")
    for team in sorted(team_names):
        print(f"  {team}: {team_matches[team]} matches")
        
    print(f"\nTeams playing in both slots 1 and 4: {slot_1_4_conflicts}")
    if conflict_weeks:
        print(f"Weeks with slot 1-4 conflicts: {', '.join(map(str, conflict_weeks))}")
    
    # Verify that no team plays more than 2 games in any week
    over_limit = False
    for team in team_names:
        for week, count in team_weekly_games[team].items():
            if count > 2:
                print(f"Warning: {team} plays {count} games in week {week}")
                over_limit = True
    
    if not over_limit:
        print("\nAll teams play at most 2 games per week.")

def verify_team_matchups(schedule, team_names):
    """
    Verify that each team plays every other team exactly twice.
    This correctly handles matchups regardless of home/away designation.
    """
    # Use frozenset to treat team pairs as unordered
    matchups = defaultdict(int)
    
    for week, matches in schedule.items():
        for match in matches:
            team1, team2 = match["teams"]
            team_pair = frozenset([team1, team2])
            matchups[team_pair] += 1
    
    print("\nMatchup verification:")
    all_correct = True
    
    for team1, team2 in itertools.combinations(team_names, 2):
        team_pair = frozenset([team1, team2])
        count = matchups[team_pair]
        if count != 2:
            print(f"  {team1} vs {team2}: {count} times (should be 2)")
            all_correct = False
    
    if all_correct:
        print("  All teams play each other exactly twice.")

def run_multiple_trials(team_names, trials=5):
    """
    Run multiple trials of schedule generation and select the best one
    based on minimizing teams playing in both slots 1 and 4
    """
    best_schedule = None
    best_conflicts = float('inf')
    
    print(f"Running {trials} trials to find the best schedule...")
    
    for i in range(trials):
        schedule = generate_soccer_schedule(team_names)
        
        # Count conflicts
        conflicts = 0
        for week, matches in schedule.items():
            teams_in_slot_1 = set()
            teams_in_slot_4 = set()
            
            for match in matches:
                if match["slot"] == 1:
                    teams_in_slot_1.add(match["teams"][0])
                    teams_in_slot_1.add(match["teams"][1])
                elif match["slot"] == 4:
                    teams_in_slot_4.add(match["teams"][0])
                    teams_in_slot_4.add(match["teams"][1])
            
            conflicts += len(teams_in_slot_1.intersection(teams_in_slot_4))
        
        print(f"  Trial {i+1}: {conflicts} total slot 1-4 conflicts")
        
        if conflicts < best_conflicts:
            best_conflicts = conflicts
            best_schedule = schedule
    
    print(f"Best schedule found with {best_conflicts} slot 1-4 conflicts")
    return best_schedule

# Example usage
if __name__ == "__main__":
    team_names = ["Spherely", "Newcastle", "Team Flagstaff", "Internacional", "Revolution", "Nice Guys", "Ravens", "AZ Mix"]
    
    # Run multiple trials to find a good schedule
    best_schedule = run_multiple_trials(team_names, trials=5)
    
    print("\n=== FINAL SCHEDULE ===\n")
    print_schedule(best_schedule, team_names)
    verify_team_matchups(best_schedule, team_names)
```

    Running 5 trials to find the best schedule...
      Trial 1: 3 total slot 1-4 conflicts
      Trial 2: 6 total slot 1-4 conflicts
      Trial 3: 2 total slot 1-4 conflicts
      Trial 4: 0 total slot 1-4 conflicts
      Trial 5: 3 total slot 1-4 conflicts
    Best schedule found with 0 slot 1-4 conflicts
    
    === FINAL SCHEDULE ===
    
    Soccer Schedule for Teams: Spherely, Newcastle, Team Flagstaff, Internacional, Revolution, Nice Guys, Ravens, AZ Mix
    ============================================================
    
    Week 1:
    ----------------------------------------
      Slot 1, Field 1: Spherely vs Revolution
      Slot 1, Field 2: Internacional vs Team Flagstaff
      Slot 2, Field 1: Team Flagstaff vs Spherely
      Slot 2, Field 2: Newcastle vs Nice Guys
      Slot 3, Field 1: Internacional vs AZ Mix
      Slot 3, Field 2: Revolution vs Nice Guys
      Slot 4, Field 1: AZ Mix vs Newcastle
    
    Week 2:
    ----------------------------------------
      Slot 1, Field 1: Spherely vs Ravens
      Slot 1, Field 2: Team Flagstaff vs Revolution
      Slot 2, Field 1: Internacional vs Spherely
      Slot 2, Field 2: AZ Mix vs Team Flagstaff
      Slot 3, Field 1: Internacional vs Ravens
      Slot 3, Field 2: Nice Guys vs AZ Mix
      Slot 4, Field 1: Nice Guys vs Newcastle
    
    Week 3:
    ----------------------------------------
      Slot 1, Field 1: Spherely vs Newcastle
      Slot 1, Field 2: Ravens vs Team Flagstaff
      Slot 2, Field 1: Nice Guys vs Spherely
      Slot 2, Field 2: Team Flagstaff vs Internacional
      Slot 3, Field 1: Ravens vs Revolution
      Slot 3, Field 2: Internacional vs Nice Guys
      Slot 4, Field 1: Revolution vs AZ Mix
    
    Week 4:
    ----------------------------------------
      Slot 1, Field 1: AZ Mix vs Spherely
      Slot 1, Field 2: Revolution vs Team Flagstaff
      Slot 2, Field 1: Spherely vs AZ Mix
      Slot 2, Field 2: Team Flagstaff vs Newcastle
      Slot 3, Field 1: Nice Guys vs Revolution
      Slot 3, Field 2: Ravens vs Internacional
      Slot 4, Field 1: Newcastle vs Internacional
      Slot 4, Field 2: Nice Guys vs Ravens
    
    Week 5:
    ----------------------------------------
      Slot 1, Field 1: Spherely vs Team Flagstaff
      Slot 1, Field 2: Revolution vs Internacional
      Slot 2, Field 1: Team Flagstaff vs Nice Guys
      Slot 2, Field 2: Revolution vs Ravens
      Slot 3, Field 1: Internacional vs Newcastle
      Slot 3, Field 2: Ravens vs Spherely
      Slot 4, Field 1: AZ Mix vs Nice Guys
    
    Week 6:
    ----------------------------------------
      Slot 1, Field 1: Newcastle vs Team Flagstaff
      Slot 1, Field 2: AZ Mix vs Ravens
      Slot 2, Field 1: Revolution vs Newcastle
      Slot 2, Field 2: Ravens vs Nice Guys
      Slot 3, Field 1: AZ Mix vs Internacional
      Slot 3, Field 2: Spherely vs Nice Guys
      Slot 4, Field 1: Internacional vs Revolution
    
    Week 7:
    ----------------------------------------
      Slot 1, Field 1: Ravens vs Newcastle
      Slot 1, Field 2: Nice Guys vs Internacional
      Slot 2, Field 1: Team Flagstaff vs Ravens
      Slot 2, Field 2: Newcastle vs Spherely
      Slot 3, Field 1: Team Flagstaff vs AZ Mix
      Slot 3, Field 2: Spherely vs Internacional
      Slot 4, Field 1: AZ Mix vs Revolution
    
    Week 8:
    ----------------------------------------
      Slot 1, Field 1: Newcastle vs Ravens
      Slot 1, Field 2: Nice Guys vs Team Flagstaff
      Slot 2, Field 1: Revolution vs Spherely
      Slot 2, Field 2: Newcastle vs AZ Mix
      Slot 3, Field 1: Ravens vs AZ Mix
    
    Week 9:
    ----------------------------------------
      Slot 1, Field 1: Newcastle vs Revolution
    
    Schedule Summary:
    Total weeks: 9
    
    Matches per team:
      AZ Mix: 14 matches
      Internacional: 14 matches
      Newcastle: 14 matches
      Nice Guys: 14 matches
      Ravens: 14 matches
      Revolution: 14 matches
      Spherely: 14 matches
      Team Flagstaff: 14 matches
    
    Teams playing in both slots 1 and 4: 0
    
    All teams play at most 2 games per week.
    
    Matchup verification:
      All teams play each other exactly twice.



```python
team_names = ["Spherely", "Newcastle", "Team Flagstaff", "Internacional", "Revolution", "Nice Guys", "Ravens", "AZ Mix"]
```


```python
import random

def generate_double_round_robin_schedule(team_names):
    """
    Generate a double round-robin schedule for the given teams.
    Each team plays against every other team twice.
    Constraints:
    - No team plays against itself
    - No team plays twice in the same time slot
    - No team plays more than twice per week
    """
    num_teams = len(team_names)
    
    # Create all possible matchups (each team plays every other team)
    all_matchups = []
    for team1 in range(num_teams):
        for team2 in range(num_teams):
            # Skip if team is playing against itself
            if team1 != team2:
                all_matchups.append((team1, team2))
    
    # Organize games into weeks with 4 time slots and 2 fields
    weekly_schedule = []
    remaining_games = all_matchups.copy()
    
    while remaining_games:
        week_games = []
        games_per_team_this_week = {team: 0 for team in range(num_teams)}  # Track games per team this week
        used_teams_per_time_slot = [set() for _ in range(4)]  # Track teams per time slot
        used_matchups_this_week = set()  # Track matchups used this week
        
        for time_slot in range(4):
            for field in range(2):
                if not remaining_games:
                    break
                
                # Find a valid game for this slot
                game_found = False
                random.shuffle(remaining_games)  # Randomize to avoid patterns
                
                for game_index, (team1, team2) in enumerate(remaining_games):
                    # Check if teams are available for this time slot
                    if (team1 not in used_teams_per_time_slot[time_slot] and 
                        team2 not in used_teams_per_time_slot[time_slot]):
                        
                        # Check if teams haven't played too many games this week (max 2)
                        if (games_per_team_this_week[team1] >= 2 or games_per_team_this_week[team2] >= 2):
                            continue
                        
                        # Check if this exact matchup already happened this week (flipped or not)
                        reverse_matchup = (team2, team1)
                        if ((team1, team2) in used_matchups_this_week or 
                            reverse_matchup in used_matchups_this_week):
                            continue
                        
                        # Add this game to the week
                        week_games.append((time_slot, field, team1, team2))
                        used_teams_per_time_slot[time_slot].add(team1)
                        used_teams_per_time_slot[time_slot].add(team2)
                        games_per_team_this_week[team1] += 1
                        games_per_team_this_week[team2] += 1
                        used_matchups_this_week.add((team1, team2))
                        
                        # Remove the game from remaining games
                        remaining_games.pop(game_index)
                        game_found = True
                        break
        
        if week_games:
            weekly_schedule.append(week_games)
        else:
            # If we can't schedule any more games this week, start a new week
            continue
    
    return weekly_schedule

def print_schedule(schedule, team_names):
    """
    Print the schedule in a readable format.
    """
    print("Soccer Schedule for 8 Teams")
    print("=" * 50)
    
    for week_index, week in enumerate(schedule):
        print(f"\nWeek {week_index + 1}:")
        print("-" * 30)
        
        # Group games by time slot
        time_slot_games = {}
        for time_slot, field, team1, team2 in week:
            if time_slot not in time_slot_games:
                time_slot_games[time_slot] = []
            time_slot_games[time_slot].append((field, team1, team2))
        
        # Print games by time slot
        for time_slot in sorted(time_slot_games.keys()):
            print(f"  Time Slot {time_slot + 1}:")
            for field, team1, team2 in time_slot_games[time_slot]:
                team1_name = team_names[team1]
                team2_name = team_names[team2]
                print(f"    Field {field + 1}: {team1_name} vs {team2_name}")
        
        # Print games per team this week
        team_games_this_week = {team: 0 for team in range(len(team_names))}
        for time_slot, field, team1, team2 in week:
            team_games_this_week[team1] += 1
            team_games_this_week[team2] += 1
        
        print("\n  Games per team this week:")
        for team, games in team_games_this_week.items():
            if games > 0:
                print(f"    {team_names[team]}: {games} games")

def analyze_schedule(schedule, team_names):
    """
    Analyze the schedule to check for issues and validate constraints.
    """
    num_teams = len(team_names)
    game_counts = {}  # Count how many times each team plays
    matchup_counts = {}  # Count how many times each matchup occurs
    
    # Initialize counts
    for team in range(num_teams):
        game_counts[team] = 0
        for opponent in range(num_teams):
            if team != opponent:
                matchup_counts[(team, opponent)] = 0
    
    # Count games and matchups
    for week in schedule:
        for time_slot, field, team1, team2 in week:
            game_counts[team1] += 1
            game_counts[team2] += 1
            matchup_counts[(team1, team2)] += 1
    
    # Check if any team plays itself
    self_play = False
    for week in schedule:
        for time_slot, field, team1, team2 in week:
            if team1 == team2:
                self_play = True
                print(f"ERROR: Team {team_names[team1]} plays against itself in week {schedule.index(week) + 1}, time slot {time_slot + 1}, field {field + 1}")
    
    # Check if any team plays more than twice in a week
    too_many_games = False
    for week_index, week in enumerate(schedule):
        team_games_this_week = {team: 0 for team in range(num_teams)}
        for time_slot, field, team1, team2 in week:
            team_games_this_week[team1] += 1
            team_games_this_week[team2] += 1
        
        for team, count in team_games_this_week.items():
            if count > 2:
                too_many_games = True
                print(f"ERROR: Team {team_names[team]} plays {count} games in week {week_index + 1} (max should be 2)")
    
    # Print analysis
    print("\nSchedule Analysis:")
    print("-" * 30)
    
    if not self_play:
        print("✓ No team plays against itself")
    
    if not too_many_games:
        print("✓ No team plays more than 2 games per week")
    
    # Check if each team plays the expected number of games
    expected_games_per_team = (num_teams - 1) * 2
    print("\nGames per team:")
    all_correct = True
    for team, count in game_counts.items():
        print(f"  {team_names[team]}: {count} games")
        if count != expected_games_per_team:
            all_correct = False
    
    if all_correct:
        print(f"✓ All teams play the expected {expected_games_per_team} games")
    else:
        print("✗ Not all teams play the expected number of games")
    
    # Check if each matchup occurs exactly twice
    print("\nMatchups (should be 2 for each pair of teams):")
    all_matchups_correct = True
    incorrect_matchups = []
    for (team1, team2), count in matchup_counts.items():
        if count != 2:
            all_matchups_correct = False
            incorrect_matchups.append((team1, team2, count))
    
    if all_matchups_correct:
        print("✓ All teams play against each other exactly twice")
    else:
        print("✗ Not all teams play against each other exactly twice")
        for team1, team2, count in incorrect_matchups:
            print(f"  {team_names[team1]} vs {team_names[team2]}: {count} times")

# Main execution
def main():
    team_names = ["Spherely", "Newcastle", "Team Flagstaff", "Internacional", "Revolution", "Nice Guys", "Ravens", "AZ Mix"]
    
    # Set seed for reproducibility
    random.seed(42)
    
    # Generate the schedule
    schedule = generate_double_round_robin_schedule(team_names)
    
    # Print the schedule
    print_schedule(schedule, team_names)
    
    # Analyze the schedule
    analyze_schedule(schedule, team_names)
    
    # Print summary
    print("\nSummary:")
    print(f"Total weeks: {len(schedule)}")
    total_games = sum(len(week) for week in schedule)
    print(f"Total games scheduled: {total_games}")
    expected_games = len(team_names) * (len(team_names) - 1)
    print(f"Expected games (each team plays every other team twice): {expected_games}")
    
    if total_games < expected_games:
        print(f"Warning: Could not schedule all games. {expected_games - total_games} games are missing.")

if __name__ == "__main__":
    main()
```

    Soccer Schedule for 8 Teams
    ==================================================
    
    Week 1:
    ------------------------------
      Time Slot 1:
        Field 1: Revolution vs Team Flagstaff
        Field 2: Nice Guys vs Newcastle
      Time Slot 2:
        Field 1: Revolution vs Internacional
        Field 2: Ravens vs Team Flagstaff
      Time Slot 3:
        Field 1: Ravens vs Newcastle
        Field 2: Internacional vs AZ Mix
      Time Slot 4:
        Field 1: Spherely vs AZ Mix
    
      Games per team this week:
        Spherely: 1 games
        Newcastle: 2 games
        Team Flagstaff: 2 games
        Internacional: 2 games
        Revolution: 2 games
        Nice Guys: 1 games
        Ravens: 2 games
        AZ Mix: 2 games
    
    Week 2:
    ------------------------------
      Time Slot 1:
        Field 1: Spherely vs Nice Guys
        Field 2: Ravens vs AZ Mix
      Time Slot 2:
        Field 1: AZ Mix vs Revolution
        Field 2: Team Flagstaff vs Internacional
      Time Slot 3:
        Field 1: Revolution vs Newcastle
        Field 2: Nice Guys vs Ravens
      Time Slot 4:
        Field 1: Spherely vs Internacional
        Field 2: Newcastle vs Team Flagstaff
    
      Games per team this week:
        Spherely: 2 games
        Newcastle: 2 games
        Team Flagstaff: 2 games
        Internacional: 2 games
        Revolution: 2 games
        Nice Guys: 2 games
        Ravens: 2 games
        AZ Mix: 2 games
    
    Week 3:
    ------------------------------
      Time Slot 1:
        Field 1: Nice Guys vs Spherely
        Field 2: Newcastle vs Revolution
      Time Slot 2:
        Field 1: Revolution vs Nice Guys
        Field 2: Team Flagstaff vs Ravens
      Time Slot 3:
        Field 1: Internacional vs Team Flagstaff
        Field 2: Newcastle vs Spherely
      Time Slot 4:
        Field 1: AZ Mix vs Internacional
    
      Games per team this week:
        Spherely: 2 games
        Newcastle: 2 games
        Team Flagstaff: 2 games
        Internacional: 2 games
        Revolution: 2 games
        Nice Guys: 2 games
        Ravens: 1 games
        AZ Mix: 1 games
    
    Week 4:
    ------------------------------
      Time Slot 1:
        Field 1: Nice Guys vs Internacional
        Field 2: AZ Mix vs Team Flagstaff
      Time Slot 2:
        Field 1: Newcastle vs Ravens
        Field 2: AZ Mix vs Nice Guys
      Time Slot 3:
        Field 1: Ravens vs Spherely
        Field 2: Team Flagstaff vs Revolution
      Time Slot 4:
        Field 1: Spherely vs Newcastle
        Field 2: Internacional vs Revolution
    
      Games per team this week:
        Spherely: 2 games
        Newcastle: 2 games
        Team Flagstaff: 2 games
        Internacional: 2 games
        Revolution: 2 games
        Nice Guys: 2 games
        Ravens: 2 games
        AZ Mix: 2 games
    
    Week 5:
    ------------------------------
      Time Slot 1:
        Field 1: Newcastle vs AZ Mix
        Field 2: Spherely vs Revolution
      Time Slot 2:
        Field 1: Team Flagstaff vs Newcastle
        Field 2: Ravens vs Revolution
      Time Slot 3:
        Field 1: Internacional vs Nice Guys
        Field 2: Team Flagstaff vs Spherely
      Time Slot 4:
        Field 1: AZ Mix vs Ravens
    
      Games per team this week:
        Spherely: 2 games
        Newcastle: 2 games
        Team Flagstaff: 2 games
        Internacional: 1 games
        Revolution: 2 games
        Nice Guys: 1 games
        Ravens: 2 games
        AZ Mix: 2 games
    
    Week 6:
    ------------------------------
      Time Slot 1:
        Field 1: Nice Guys vs AZ Mix
        Field 2: Newcastle vs Internacional
      Time Slot 2:
        Field 1: AZ Mix vs Newcastle
        Field 2: Nice Guys vs Revolution
      Time Slot 3:
        Field 1: Spherely vs Ravens
      Time Slot 4:
        Field 1: Internacional vs Ravens
        Field 2: Spherely vs Team Flagstaff
    
      Games per team this week:
        Spherely: 2 games
        Newcastle: 2 games
        Team Flagstaff: 1 games
        Internacional: 2 games
        Revolution: 1 games
        Nice Guys: 2 games
        Ravens: 2 games
        AZ Mix: 2 games
    
    Week 7:
    ------------------------------
      Time Slot 1:
        Field 1: Nice Guys vs Team Flagstaff
        Field 2: Revolution vs Spherely
      Time Slot 2:
        Field 1: Internacional vs Spherely
        Field 2: Revolution vs Ravens
      Time Slot 3:
        Field 1: Newcastle vs Nice Guys
        Field 2: Team Flagstaff vs AZ Mix
      Time Slot 4:
        Field 1: Ravens vs Internacional
    
      Games per team this week:
        Spherely: 2 games
        Newcastle: 1 games
        Team Flagstaff: 2 games
        Internacional: 2 games
        Revolution: 2 games
        Nice Guys: 2 games
        Ravens: 2 games
        AZ Mix: 1 games
    
    Week 8:
    ------------------------------
      Time Slot 1:
        Field 1: Ravens vs Nice Guys
        Field 2: Internacional vs Newcastle
      Time Slot 2:
        Field 1: AZ Mix vs Spherely
        Field 2: Team Flagstaff vs Nice Guys
      Time Slot 3:
        Field 1: Revolution vs AZ Mix
    
      Games per team this week:
        Spherely: 1 games
        Newcastle: 1 games
        Team Flagstaff: 1 games
        Internacional: 1 games
        Revolution: 1 games
        Nice Guys: 2 games
        Ravens: 1 games
        AZ Mix: 2 games
    
    Schedule Analysis:
    ------------------------------
    ✓ No team plays against itself
    ✓ No team plays more than 2 games per week
    
    Games per team:
      Spherely: 14 games
      Newcastle: 14 games
      Team Flagstaff: 14 games
      Internacional: 14 games
      Revolution: 14 games
      Nice Guys: 14 games
      Ravens: 14 games
      AZ Mix: 14 games
    ✓ All teams play the expected 14 games
    
    Matchups (should be 2 for each pair of teams):
    ✗ Not all teams play against each other exactly twice
      Spherely vs Newcastle: 1 times
      Spherely vs Team Flagstaff: 1 times
      Spherely vs Internacional: 1 times
      Spherely vs Revolution: 1 times
      Spherely vs Nice Guys: 1 times
      Spherely vs Ravens: 1 times
      Spherely vs AZ Mix: 1 times
      Newcastle vs Spherely: 1 times
      Newcastle vs Team Flagstaff: 1 times
      Newcastle vs Internacional: 1 times
      Newcastle vs Revolution: 1 times
      Newcastle vs Nice Guys: 1 times
      Newcastle vs Ravens: 1 times
      Newcastle vs AZ Mix: 1 times
      Team Flagstaff vs Spherely: 1 times
      Team Flagstaff vs Newcastle: 1 times
      Team Flagstaff vs Internacional: 1 times
      Team Flagstaff vs Revolution: 1 times
      Team Flagstaff vs Nice Guys: 1 times
      Team Flagstaff vs Ravens: 1 times
      Team Flagstaff vs AZ Mix: 1 times
      Internacional vs Spherely: 1 times
      Internacional vs Newcastle: 1 times
      Internacional vs Team Flagstaff: 1 times
      Internacional vs Revolution: 1 times
      Internacional vs Nice Guys: 1 times
      Internacional vs Ravens: 1 times
      Internacional vs AZ Mix: 1 times
      Revolution vs Spherely: 1 times
      Revolution vs Newcastle: 1 times
      Revolution vs Team Flagstaff: 1 times
      Revolution vs Internacional: 1 times
      Revolution vs Nice Guys: 1 times
      Revolution vs Ravens: 1 times
      Revolution vs AZ Mix: 1 times
      Nice Guys vs Spherely: 1 times
      Nice Guys vs Newcastle: 1 times
      Nice Guys vs Team Flagstaff: 1 times
      Nice Guys vs Internacional: 1 times
      Nice Guys vs Revolution: 1 times
      Nice Guys vs Ravens: 1 times
      Nice Guys vs AZ Mix: 1 times
      Ravens vs Spherely: 1 times
      Ravens vs Newcastle: 1 times
      Ravens vs Team Flagstaff: 1 times
      Ravens vs Internacional: 1 times
      Ravens vs Revolution: 1 times
      Ravens vs Nice Guys: 1 times
      Ravens vs AZ Mix: 1 times
      AZ Mix vs Spherely: 1 times
      AZ Mix vs Newcastle: 1 times
      AZ Mix vs Team Flagstaff: 1 times
      AZ Mix vs Internacional: 1 times
      AZ Mix vs Revolution: 1 times
      AZ Mix vs Nice Guys: 1 times
      AZ Mix vs Ravens: 1 times
    
    Summary:
    Total weeks: 8
    Total games scheduled: 56
    Expected games (each team plays every other team twice): 56



```python
def optimize_schedule_with_timeslots(num_teams):
    """
    Generate a double round-robin schedule for 8 teams where:
    1. Each team plays every other team twice
    2. No team plays the same opponent twice in one week
    3. Every team plays exactly twice per week
    4. There are four time slots per week
    5. The full schedule fits in (num_teams - 1) weeks
    """
    if num_teams != 8:
        print("This optimized implementation is specifically for 8 teams")
        return None
    
    # For 8 teams, we can create a specific optimal solution
    # First round-robin pattern (each row is a week's games)
    round1 = [
        [(1, 8), (2, 7), (3, 6), (4, 5)],
        [(1, 7), (8, 6), (2, 5), (3, 4)],
        [(1, 6), (7, 5), (8, 4), (2, 3)],
        [(1, 5), (6, 4), (7, 3), (8, 2)],
        [(1, 4), (5, 3), (6, 2), (7, 8)],
        [(1, 3), (4, 2), (5, 8), (6, 7)],
        [(1, 2), (3, 8), (4, 7), (5, 6)]
    ]
    
    # Second round-robin with reversed matchups
    round2 = [
        [(8, 1), (7, 2), (6, 3), (5, 4)],
        [(7, 1), (6, 8), (5, 2), (4, 3)],
        [(6, 1), (5, 7), (4, 8), (3, 2)],
        [(5, 1), (4, 6), (3, 7), (2, 8)],
        [(4, 1), (3, 5), (2, 6), (8, 7)],
        [(3, 1), (2, 4), (8, 5), (7, 6)],
        [(2, 1), (8, 3), (7, 4), (6, 5)]
    ]
    
    # Combine with careful arrangement to avoid conflicts and distribute across time slots
    schedule = []
    for week in range(7):
        week_games = {
            'time_slot_1': [],
            'time_slot_2': [],
            'time_slot_3': [],
            'time_slot_4': []
        }
        
        # Distribute round1 games across time slots 1 and 2
        week_games['time_slot_1'].append(round1[week][0])
        week_games['time_slot_1'].append(round1[week][1])
        week_games['time_slot_2'].append(round1[week][2])
        week_games['time_slot_2'].append(round1[week][3])
        
        # Distribute round2 games across time slots 3 and 4
        # Use a different week from round2 to avoid conflicts
        shifted_week = (week + 3) % 7
        week_games['time_slot_3'].append(round2[shifted_week][0])
        week_games['time_slot_3'].append(round2[shifted_week][1])
        week_games['time_slot_4'].append(round2[shifted_week][2])
        week_games['time_slot_4'].append(round2[shifted_week][3])
        
        schedule.append(week_games)
    
    return schedule

def print_schedule_with_timeslots(schedule):
    """Print the schedule with time slots in a readable format"""
    for week, time_slots in enumerate(schedule, 1):
        print(f"Week {week}:")
        for slot_num, (slot_name, games) in enumerate(time_slots.items(), 1):
            print(f"  Time Slot {slot_num}:")
            for game_num, (team1, team2) in enumerate(games, 1):
                print(f"    Game {game_num}: Team {team1} vs Team {team2}")
        print()

def verify_schedule_with_timeslots(schedule, num_teams):
    """Verify that the schedule meets all requirements"""
    matchups = {}
    weekly_games = {}
    
    for week, time_slots in enumerate(schedule, 1):
        weekly_games[week] = {}
        teams_this_week = set()
        
        for slot_name, games in time_slots.items():
            teams_this_slot = set()
            
            for team1, team2 in games:
                # Verify no team plays twice in same time slot
                if team1 in teams_this_slot or team2 in teams_this_slot:
                    print(f"Error: Team {team1} or {team2} plays twice in Week {week}, {slot_name}")
                    return False
                
                teams_this_slot.add(team1)
                teams_this_slot.add(team2)
                
                # Track teams playing this week
                if team1 in teams_this_week and team2 in teams_this_week:
                    same_matchup = False
                    for other_slot, other_games in time_slots.items():
                        if other_slot == slot_name:
                            continue
                        for other_t1, other_t2 in other_games:
                            if (other_t1 == team1 and other_t2 == team2) or (other_t1 == team2 and other_t2 == team1):
                                same_matchup = True
                    if same_matchup:
                        print(f"Error: Teams {team1} and {team2} play each other twice in Week {week}")
                        return False
                
                teams_this_week.add(team1)
                teams_this_week.add(team2)
                
                # Count matchups
                key = tuple(sorted([team1, team2]))
                matchups[key] = matchups.get(key, 0) + 1
                
                # Track weekly games per team
                weekly_games[week][team1] = weekly_games[week].get(team1, 0) + 1
                weekly_games[week][team2] = weekly_games[week].get(team2, 0) + 1
    
    # Check each team plays every other team exactly twice
    all_good = True
    for team1 in range(1, num_teams + 1):
        for team2 in range(team1 + 1, num_teams + 1):
            key = (team1, team2)
            count = matchups.get(key, 0)
            if count != 2:
                print(f"Teams {team1} and {team2} play {count} times (should be 2)")
                all_good = False
    
    # Check each team plays exactly twice per week
    for week, games in weekly_games.items():
        for team in range(1, num_teams + 1):
            if games.get(team, 0) != 2:
                print(f"Team {team} plays {games.get(team, 0)} games in week {week} (should be 2)")
                all_good = False
    
    if all_good:
        print("Schedule is valid!")
        print("✓ Each team plays every other team exactly twice")
        print("✓ Each team plays exactly 2 games every week")
        print("✓ No team plays the same opponent twice in one week")
        print("✓ Games are distributed across 4 time slots per week")
        return True
    else:
        print("Schedule has issues!")
        return False

# Generate and verify schedule for 8 teams with time slots
num_teams = 8
schedule = optimize_schedule_with_timeslots(num_teams)
print_schedule_with_timeslots(schedule)
verify_schedule_with_timeslots(schedule, num_teams)
```

    Week 1:
      Time Slot 1:
        Game 1: Team 1 vs Team 8
        Game 2: Team 2 vs Team 7
      Time Slot 2:
        Game 1: Team 3 vs Team 6
        Game 2: Team 4 vs Team 5
      Time Slot 3:
        Game 1: Team 5 vs Team 1
        Game 2: Team 4 vs Team 6
      Time Slot 4:
        Game 1: Team 3 vs Team 7
        Game 2: Team 2 vs Team 8
    
    Week 2:
      Time Slot 1:
        Game 1: Team 1 vs Team 7
        Game 2: Team 8 vs Team 6
      Time Slot 2:
        Game 1: Team 2 vs Team 5
        Game 2: Team 3 vs Team 4
      Time Slot 3:
        Game 1: Team 4 vs Team 1
        Game 2: Team 3 vs Team 5
      Time Slot 4:
        Game 1: Team 2 vs Team 6
        Game 2: Team 8 vs Team 7
    
    Week 3:
      Time Slot 1:
        Game 1: Team 1 vs Team 6
        Game 2: Team 7 vs Team 5
      Time Slot 2:
        Game 1: Team 8 vs Team 4
        Game 2: Team 2 vs Team 3
      Time Slot 3:
        Game 1: Team 3 vs Team 1
        Game 2: Team 2 vs Team 4
      Time Slot 4:
        Game 1: Team 8 vs Team 5
        Game 2: Team 7 vs Team 6
    
    Week 4:
      Time Slot 1:
        Game 1: Team 1 vs Team 5
        Game 2: Team 6 vs Team 4
      Time Slot 2:
        Game 1: Team 7 vs Team 3
        Game 2: Team 8 vs Team 2
      Time Slot 3:
        Game 1: Team 2 vs Team 1
        Game 2: Team 8 vs Team 3
      Time Slot 4:
        Game 1: Team 7 vs Team 4
        Game 2: Team 6 vs Team 5
    
    Week 5:
      Time Slot 1:
        Game 1: Team 1 vs Team 4
        Game 2: Team 5 vs Team 3
      Time Slot 2:
        Game 1: Team 6 vs Team 2
        Game 2: Team 7 vs Team 8
      Time Slot 3:
        Game 1: Team 8 vs Team 1
        Game 2: Team 7 vs Team 2
      Time Slot 4:
        Game 1: Team 6 vs Team 3
        Game 2: Team 5 vs Team 4
    
    Week 6:
      Time Slot 1:
        Game 1: Team 1 vs Team 3
        Game 2: Team 4 vs Team 2
      Time Slot 2:
        Game 1: Team 5 vs Team 8
        Game 2: Team 6 vs Team 7
      Time Slot 3:
        Game 1: Team 7 vs Team 1
        Game 2: Team 6 vs Team 8
      Time Slot 4:
        Game 1: Team 5 vs Team 2
        Game 2: Team 4 vs Team 3
    
    Week 7:
      Time Slot 1:
        Game 1: Team 1 vs Team 2
        Game 2: Team 3 vs Team 8
      Time Slot 2:
        Game 1: Team 4 vs Team 7
        Game 2: Team 5 vs Team 6
      Time Slot 3:
        Game 1: Team 6 vs Team 1
        Game 2: Team 5 vs Team 7
      Time Slot 4:
        Game 1: Team 4 vs Team 8
        Game 2: Team 3 vs Team 2
    
    Schedule is valid!
    ✓ Each team plays every other team exactly twice
    ✓ Each team plays exactly 2 games every week
    ✓ No team plays the same opponent twice in one week
    ✓ Games are distributed across 4 time slots per week





    True




```python
generate_double_round_robin(8)
```

    Conflict detected in week 1
    Conflict detected in week 2
    Conflict detected in week 3
    Conflict detected in week 4
    Conflict detected in week 5
    Conflict detected in week 6
    Conflict detected in week 7





    [[(1, 8), (2, 7), (3, 6), (4, 5), (1, 2), (3, 8), (4, 7), (5, 6)],
     [(1, 7), (8, 6), (2, 5), (3, 4), (1, 2), (4, 8), (3, 7), (5, 6)],
     [(1, 6), (7, 5), (8, 4), (2, 3), (1, 2), (3, 8), (4, 7), (5, 6)],
     [(1, 5), (6, 4), (7, 3), (8, 2), (1, 2), (4, 8), (3, 7), (5, 6)],
     [(1, 4), (5, 3), (6, 2), (7, 8), (1, 2), (3, 8), (4, 7), (5, 6)],
     [(1, 3), (4, 2), (5, 8), (6, 7), (1, 2), (4, 8), (3, 7), (5, 6)],
     [(1, 2), (3, 8), (4, 7), (5, 6), (1, 2), (3, 8), (4, 7), (5, 6)]]




```python

```
