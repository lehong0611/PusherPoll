const form = document.getElementById('vote-form');

//Form submit event
form.addEventListener('submit', e => {
    const choice = document.querySelector('input[name=nodejs]:checked').value;
    console.log(choice);
    const data = { nodejs: choice };

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();
});

let dataPoints = [
    { label: 'KOA', y: 0 },
    { label: 'Express', y: 0 },
    { label: 'Sails', y: 0 },
    { label: 'Other', y: 0 },
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'NodeJs Framework Results'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('ee9c5f7f2c886399363e', {
       cluster: 'ap1',
       forceTLS: true
    });
 
    var channel = pusher.subscribe('nodejs-poll');
    channel.bind('nodejs-vote', function(data) {
       dataPoints = dataPoints.map( x => {
           if (x.label == data.nodejs) {
               x.y += data.points;
               return x;
           } else {
               return x;
           }
       });
       chart.render();
    });
}
