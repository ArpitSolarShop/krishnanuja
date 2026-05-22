const payload = {
  name: "Test From Node",
  mobile: 9000000001,
  email: "info@neodove.com",
  detail1: "Bill: 1000 | Timeline: immediate",
  detail2: "Address: Node script test"
};

fetch('https://6513442b-f879-45c9-be19-944f45086e60.neodove.com/integration/custom/1e376832-40d7-47df-bb80-682287d9e15a/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  body: JSON.stringify(payload)
})
.then(res => res.text().then(text => console.log(res.status, text)))
.catch(err => console.error(err));
