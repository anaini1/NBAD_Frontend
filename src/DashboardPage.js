import React, { useState, useEffect } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Header from './Header';
export const calculateDifference= (dataSource) => {

  let totalBudget=0; 
  let totalExpenses=0;
  if(dataSource.datasets[0].data.length>0){
  for(var i=0;i<dataSource.datasets[0].data.length;i++)
  {
    totalBudget+=dataSource.datasets[0].data[i];
    totalExpenses+= dataSource.datasets[0].expense[i];
  }
  const difference = totalBudget - totalExpenses;
 return difference;
}
return null;
};
function DashboardPage() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('jwt');
  const months = [
    'Select Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const handleModify = (index) => {
    const rowData = {
      title: dataSource.labels[index],
      budget: dataSource.datasets[0].data[index],
      color: dataSource.datasets[0].backgroundColor[index],
      expense: dataSource.datasets[0].expense[index],
      month: dataSource.datasets[0].month[index]
    };
    navigate('/modifycategory', { state: { rowData } });
  };
  const handleDelete = (index) => {
    const rowData = {
      title: dataSource.labels[index],
      // budget: dataSource.datasets[0].data[index],
      // color: dataSource.datasets[0].backgroundColor[index],
      // expense: dataSource.datasets[0].expense[index],
      month: dataSource.datasets[0].month[index]
    };
    navigate('/deletecategory', { state: { rowData } });
  };
  function decodingJWT(token) {
    try {
      const base64payload = (token.split('.')[1]).replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      return {};
    }
  }

  useEffect(() => {
    const existingToken = localStorage.getItem('jwt');
    if (existingToken) {
      const decodedToken = decodingJWT(existingToken);
      const issuedAt = decodedToken.iat; 
      const expiresIn = decodedToken.exp - issuedAt;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const warningTime = expiresIn - 20;
      const warningTimeout = setTimeout(() => {
        const userResponse = window.confirm('Your session will expire in 20 seconds. Do you want to continue?');

        if (!userResponse || currentTimeInSeconds-issuedAt>expiresIn) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('username');
          window.location.reload();
        }
      }, warningTime * 1000);

      return () => clearTimeout(warningTimeout);
    }
  }, []);

  const [selectedMonth, setSelectedMonth] = useState('Select Month');
  const [selectedMonth1, setSelectedMonth1] = useState('Select Month');
  const [selectedMonth2, setSelectedMonth2] = useState('Select Month');
  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
        expense: [],
        month: [],
      },
    ],
    labels: [],
  });

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const drawDonutChart = () => {
    const ctx = document.getElementById('chart1').getContext('2d');
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const filteredExpenses = dataSource.datasets[0].expense.filter(
      (expense, index) => dataSource.datasets[0].month[index] === selectedMonth1
    );
    const filteredLabels = dataSource.labels.filter(
      (_, index) => dataSource.datasets[0].month[index] === selectedMonth1
    );
    const filteredColors = dataSource.datasets[0].backgroundColor.filter(
      (_, index) => dataSource.datasets[0].month[index] === selectedMonth1
    );

    if (filteredLabels.length === 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No data', ctx.canvas.width / 2, ctx.canvas.height / 2);
    } else {
      existingChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: filteredLabels,
          datasets: [
            {
              label: 'Expenses',
              data: filteredExpenses,
              backgroundColor:filteredColors,
              borderWidth: 1,
            },
          ],
        },
      });
    }
  };

  const drawBarChart2 = () => {
    const ctx = document.getElementById('chart2').getContext('2d');
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
  
    const filteredExpenses = [];
    const filteredBudget = [];
    const filteredLabels = [];
    const filteredColors = [];
   
    dataSource.labels.forEach((label, index) => {
      if (dataSource.datasets[0].month[index] === selectedMonth2) {
        filteredLabels.push(label);
        filteredExpenses.push(dataSource.datasets[0].expense[index]);
        filteredBudget.push(dataSource.datasets[0].data[index]);
        filteredColors.push(dataSource.datasets[0].backgroundColor[index]);
      }
    });
  
    if (filteredLabels.length === 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No data ', ctx.canvas.width / 2, ctx.canvas.height / 2);
    } else {
      existingChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: filteredLabels,
          datasets: [
            {
              label: 'Budget',
              data: filteredBudget,
              backgroundColor: filteredColors,
              borderColor: filteredColors,
              borderWidth: 1
            },
            {
              label: 'Expenses',
              data: filteredExpenses,
              backgroundColor: filteredColors,
              borderColor: filteredColors,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  const drawTotalChart = () => {
    const ctx = document.getElementById('chart3').getContext('2d');
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
  
    const filteredLabels = dataSource.labels;
    const filteredData = dataSource.datasets[0].data;
  console.log('dataSource.datasets[0].data::',dataSource.datasets[0].data)
    // Define an array of colors for the chart
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9900', '#66CCCC', '#99CC99', '#FF6666', '#666699', '#CCCC99', '#FF99CC', '#3399FF'];
  
    if (filteredLabels.length === 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No data', ctx.canvas.width / 2, ctx.canvas.height / 2);
    } else {
      existingChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: dataSource.labels,
          datasets: [{
            label: 'Total Budget and Expenses',
            data: dataSource.datasets[0].data,
            backgroundColor: colors, // Use the defined colors array
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  };
  const getBudget = () => {
    axios
      .get(`https://plankton-app-f6ufz.ondigitalocean.app/budget/${username} `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        let budgetTotal = 0;
        let expenseTotal = 0;
        for (var i = 0; i < res.data.length; i++) {
          budgetTotal += res.data[i].budget;
          expenseTotal += res.data[i].expense;
          dataSource.datasets[0].data[i] = res.data[i].budget;
          dataSource.labels[i] = res.data[i].title;
          dataSource.datasets[0].backgroundColor[i] = res.data[i].color;
          dataSource.datasets[0].expense[i] = res.data[i].expense;
          dataSource.datasets[0].month[i] = res.data[i].month;
        }
        setTotalBudget(budgetTotal);
        setTotalExpense(expenseTotal);
        drawDonutChart();
        drawTotalChart();
      })
      .catch(function (error) {
        console.error('Error fetching budget data:', error);
      });
  };

  useEffect(() => {
    getBudget();
  }, []);

  useEffect(() => {
    drawDonutChart();
  }, [selectedMonth1, dataSource]);

  useEffect(() => {
    drawBarChart2();
  }, [selectedMonth2, dataSource]);

  useEffect(() => {
    drawTotalChart();
  }, [dataSource]);

  const handleMonthChange = (event) => {
    const newSelectedMonth = event.target.value;
    setSelectedMonth(newSelectedMonth);
    setSelectedMonth1(newSelectedMonth);
    setSelectedMonth2(newSelectedMonth);
  };

  const handleChange1 = (event) => {
    setSelectedMonth1(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedMonth2(event.target.value);
  };

 
  const handleAddCategory = () => {
    navigate('/addcategory');
  };

  useEffect(() => {
    drawTotalChart();
  }, [dataSource]);

  
  return (
    <div><Header></Header>
    <div style={{ position: 'relative', padding: '30px',paddingTop:'100px' }}>
      <div className="dashboard-corner-section">
        <div className="heading-container">
          <h1 className="dashboard-head">{username}'s Budgeting Dashboard</h1>
          <Link to="/login" className="logout-link">Logout</Link>
        </div>
        <div className='filter-dropdown'>
          <label htmlFor="month-dropdown">Select a month:</label><br/>
          <div className="custom-dropdown">
            <select id="month-dropdown" value={selectedMonth} onChange={handleMonthChange}>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
            <div className="dropdown-arrow">&#9660;</div>
          </div>
        </div>
        <section className="charts">
          <article className="chart chart1">
            <h3>Donut Chart for Expenses in {selectedMonth1}</h3>
            <label>
              Select a month:
              <select value={selectedMonth1} onChange={handleChange1} aria-label="Select a month">
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </label>
            <div>
              <canvas id="chart1"></canvas>
            </div>
          </article>
          <article className="chart chart2">
            <h3>Bar Chart for Budget and Expenses in {selectedMonth2}</h3>
            <label>
              Select a month:
              <select value={selectedMonth2} onChange={handleChange2} aria-label="Select a month">
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </label>
            <div>
              <canvas id="chart2"></canvas>
            </div>
          </article>
          <article className="chart chart3">
  <h3>Polar chart for all Budget</h3>
  <div>
    <canvas id="chart3"></canvas>
  </div>
</article>
        </section>
        <div id="table-container" className="data-table-container">
        <div className="new-category ">
          <button className="btn" onClick={handleAddCategory}>Add Category</button>
        
          {/* <button className="btn" onClick={handleDelete}>Delete Category</button> */}
        </div>
        <h3>Content of my budget and Expenses</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Budget</th>
                <th>Expense</th>
                <th>Month</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataSource.labels.map((label, index) => (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{dataSource.datasets[0].data[index]}</td>
                  <td>{dataSource.datasets[0].expense[index]}</td>
                  <td>{dataSource.datasets[0].month[index]}</td>
                  <td>{dataSource.datasets[0].backgroundColor[index]}</td>
                  <td>
                    <button onClick={() => handleModify(index)}>Modify</button>&nbsp;
                    <button onClick={() => handleDelete(index)}>Delete</button>&nbsp;
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DashboardPage;
