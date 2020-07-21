fetch("/api/workouts")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


  function generatePalette() {
    const arr = [
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "ffa600",
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "ffa600"
    ]
  
    return arr;
  }
// API.getWorkoutsInRange()


function populateChart(data) {

  let workoutDates = calcWorkoutDates(data);
  let workoutDurations = calcWorkoutDuration(data);
  let workoutPounds = calcWorkoutPounds(data);
  let cardioWorkouts = getCardioWorkouts(data);
  let cardioDurations = calcCardioDuration(data);
  let resistanceWorkouts = getResistanceWorkouts(data);
  let resistancePounds = calcResistancePounds(data);

  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");




  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: workoutDates,
      datasets: [
        {
          label: "Workout Duration (min)",
          backgroundColor: "#FF7C42",
          borderColor: "#FF7C42",
          data: workoutDurations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Total Duration per Workout (min)"
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 45
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            stepSize: 10
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: workoutDates,
      datasets: [
        {
          label: "Pounds",
          data: workoutPounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted per Workout"
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: cardioWorkouts,
      datasets: [
        {
          label: "Minutes",
          backgroundColor: colors,
          data: cardioDurations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Minutes per Cardio Exercise"
      },
      maintainAspectRatio: false
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: resistanceWorkouts,
      datasets: [
        {
          label: "Pounds",
          backgroundColor: colors.reverse(),
          data: resistancePounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Pounds per Resistance Exercise"
      },
      maintainAspectRatio: false
    }
  });
}


function calcWorkoutDates(data) {
  let workoutDates = [];

  data.forEach(workout => {
    let formattedDate = moment(workout.day).format('lll');
    workoutDates.push(formattedDate);
  });

  return workoutDates;
};

function calcWorkoutDuration(workouts) {
  let durations = [];

 
  workouts.forEach(workout => {
    let calcDuration = 0;
   
    workout.exercises.forEach(exercise => {
      
      durations.push(exercise.duration);
    });
   
 
  });

  return durations;
}

function calcWorkoutPounds(data) {
  let total = [];


  data.forEach(workout => {
    let workoutPounds = 0;
   
    workout.exercises.forEach(exercise => {
     
      if (exercise.type === "resistance") {
        workoutPounds += exercise.weight;

        
      } else if (exercise.type === "cardio") {
        workoutPounds += 0;
      }
    });


    total.push(workoutPounds);
  });

  return total;
}




function getCardioWorkouts(data) {
  let workouts = [];

  data.forEach(workout => {
   
    workout.exercises.forEach(exercise => {
      if (exercise.type === "cardio") {
        workouts.push(exercise.name);
      }
    });
  });

  return workouts;
};

function calcCardioDuration(workouts) {
  let durations = [];


  workouts.forEach(workout => {
    let calcDuration = 0;
    
    workout.exercises.forEach(exercise => {
    
      if (exercise.type === "cardio") {
        calcDuration += exercise.duration;
      }
    });

    durations.push(calcDuration);
  });

  return durations;
}




function getResistanceWorkouts(data) {
  let workouts = [];

  data.forEach(workout => {

    workout.exercises.forEach(exercise => {
      if (exercise.type === "resistance") {
        workouts.push(exercise.name);
      }
    });
  });

  return workouts;
}

function calcResistancePounds(workouts) {
  let pounds = [];


  workouts.forEach(workout => {
    let exercisePounds = 0;
 
    workout.exercises.forEach(exercise => {
  
      if (exercise.type === "resistance") {
        pounds.push(exercise.weight);
      }
    });
  });

  return pounds;
}

