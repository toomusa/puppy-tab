console.log("connected");

$(document).on("click", "#startBtn", async (event) => {
  $("#startBtn").attr("disabled", true);
  $("#stopBtn").attr("disabled", false);
  $("#startBtn").text("Checking");
  let count = 0;
  const click = () => {
    console.log(count + " clicks");
    count++;
  }

  $(document).on("click", "#stopBtn", async (event) => {
    $("#stopBtn").attr("disabled", true);
    $("#startBtn").attr("disabled", false);
    clearInterval(interval);
  });

  const checkPups = async () => {
    await $.get("/scrape", function (data) {
      console.log(data);
    })
  }

  // checkPups();

  // const interval = setInterval(checkPups, 1000)
  
})