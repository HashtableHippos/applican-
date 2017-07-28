function getPieData(state) {
  const dataTemplate = [
    { x: 1, y: 0, label: 'Start' },
    { x: 2, y: 0, label: 'Application' },
    { x: 3, y: 0, label: 'Submit' },
    { x: 4, y: 0, label: 'Interview' },

  ];
  return state.userJobs.reduce((prev, cur) => {
    if (cur.status >= 0 && cur.status <= 3) {
      const numOfJobs = prev[cur.status].y;
      Object.assign(prev[(cur.status)], { y: numOfJobs + 1 });
    }
    return prev;
  }, dataTemplate);
}

export default getPieData;
