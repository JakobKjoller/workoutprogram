var resultDiv = $('.workoutdiv');

async function LoadData() {
    console.log("Loading data");
    try {
        const response = await fetch("./data/workouts.json");
        if (!response.ok) throw new Error(response.status + " " + response.statusText);
        const json = await response.json();
        console.log("Loaded", json.length, "items");
        return json;
    } catch (err) {
        console.error("fetch failed:", err);
        throw err; // rethrow so callers can handle
    }
}


async function LoadRandomOne() {
    LoadData().then(result => {

        var length = result.length;

        let x = Math.floor(Math.random() * length);

        var data = result[x];

        Createworkout(data)
    });

}

async function LoadAll() {
    LoadData().then(result => {
        $.each(result, function (key, value) {
            Createworkout(value);

        });
    });
}

function Createworkout(value) {
    const workout = $('<div class="workout"></div>');

    // title & optional note
    $('<div class="title"><h2>' + value.title + '</h2></div>').appendTo(workout);
    if (value.note) {
        $('<div class="note">' + value.note + '</div>').appendTo(workout);
    }

    
        const setsContainer = $('<div class="sets"></div>').appendTo(workout);

        value.sets.forEach(set => {
            const setDiv = $('<div class="set"></div>');
            $('<h3>' + set.name + '</h3>').appendTo(setDiv);
            if (set.rounds != null) {
                $('<div class="rounds">Runder: ' + set.rounds + '</div>').appendTo(setDiv);
            }

            const exercisesDiv = $('<div class="exercises"><h4>Øvelser</h4></div>');
            
            set.exercises.forEach(exercise => {

                const row = $('<div class="exerciserow"></div>');
                
                const reps = (exercise.reps != null || exercise.reps === 0) ? exercise.reps : '&nbsp;';

                $('<div class="exerciserep">' + reps + '</div>').appendTo(row);
                
                const exersice =  $('<div class="exercise">' + exercise.name + '</div>')
                 
                if (exercise.help  != null && exercise.help.trim() !== "") {
                    $('<span> (<a href="' + exercise.help + '" target="_blank">Hjælp</a>)</span>').appendTo(exersice);
                }

                  exersice.appendTo(row);              
                row.appendTo(exercisesDiv);
            });

            exercisesDiv.appendTo(setDiv);
            setDiv.appendTo(setsContainer);
        });
     

    workout.appendTo(resultDiv);
}
