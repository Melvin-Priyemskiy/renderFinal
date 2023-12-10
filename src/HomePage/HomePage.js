import { Chart } from 'chart.js/auto'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();

    function LandingPage(){navigate('/');}


  return (
    <main class="center" id="main">

        <div>
        <button onClick={LandingPage}>Back to Landing</button>
        </div>
        <div class="page-area">

            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </article>
        </div>
    </main>
  );
  
}

// var dataSource = {
//     datasets: [
//         {
//             data: [
//                30, 350, 90
//             ],
//             backgroundColor: [
//                 '#ffcd56',
//                 '#ff6384',
//                 '#36a2eb',

//             ],
//         }
//     ],
//     labels: [
//         'Eat out', 
//         'Rent',
//         'Groceries'
//     ]
// };

// function createChart() {
//     var ctx = document.getElementById("myChart").getContext("2d");
//     var myPieChart = new Chart(ctx, {
//         type: 'pie',
//         data: dataSource 
//     });
// }
// // createChart();

// function getBudget(){
//     axios.get('/budget.json')
//     .then(function(res)
//     {
//         console.log(res.data);
//         for(var i = 0; i < res.data.myBudget.length; i++)
//         {
//             dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
//             dataSource.labels[i] = res.data.myBudget[i].title;
//         }
//         createChart();
//     });
// }
// getBudget();


export default HomePage;
