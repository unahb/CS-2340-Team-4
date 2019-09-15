function validatePoints() {
    var diff, in1, in2, in3, in4, points;

    //get difficulty and point allocations
    diff = document.getElementById("difficulty").value;
    in1 = document.getElementById("Pilot").value;
    in2 = document.getElementById("Fighter").value;
    in3 = document.getElementById("Merchant").value;
    in4 = document.getElementById("Engineer").value;

    //set points with difficulty
    switch (diff) {
        case "easy":
            points = 16;
            break;
        case "medium":
            points = 12;
            break;
        case "hard":
            points = 8;
            break;
        default:
            points = 8
    }
    curr_allocated = parseInt(in1) + parseInt(in2) + parseInt(in3) + parseInt(in4);
    if (curr_allocated > points) {
        alert("Incorrect number of points allocated. Max with difficulty: " + points + ". Your points: " + curr_allocated)
        return false;
    } else {
        return true;
    }
}
