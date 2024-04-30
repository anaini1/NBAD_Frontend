import { calculateDifference } from './DashboardPage';

const dataSource = {
  datasets: [
    {
      data: [150, 200, 350],
      backgroundColor: ['maroon', 'violet', 'blue'],
      expense: [100, 165, 176],
      month: ['jan', 'feb', 'mar'], 
    },
  ],
  labels: ['category1', 'category2', 'category3'],
};

test('calculates difference correctly', () => {
  const result = calculateDifference(dataSource);

  // Calculate total budget and total expenses
  const totalBudget = dataSource.datasets[0].data.reduce((acc, val) => acc + val, 0);
  const totalExpenses = dataSource.datasets[0].expense.reduce((acc, val) => acc + val, 0);
  const expectedDifference = totalBudget - totalExpenses;

  expect(result).toEqual(expectedDifference);
});

test('handles empty datasets', () => {
  const emptyDataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [],
        expense: [],
        month: [], 
      },
    ],
    labels: [],
  };

  const result = calculateDifference(emptyDataSource);

  expect(result).toBeNull();
});
