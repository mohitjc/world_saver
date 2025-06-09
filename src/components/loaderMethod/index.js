const load = (p) => {
  if (p) {
    document.getElementById('loaderdiv').classList.remove('d-none');
  } else {
    document.getElementById('loaderdiv').classList.add('d-none');
  }
};

export default load;
