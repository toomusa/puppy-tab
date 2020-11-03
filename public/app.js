console.log("connected");

$(document).on("click", "#startBtn", async () => {
  let count = 0;
  $("#startBtn").attr("disabled", true).text("Checking");
  $("#stopBtn").attr("disabled", false);

  $(document).on("click", "#stopBtn", async () => {
    $("#stopBtn").attr("disabled", true);
    $("#startBtn").attr("disabled", false).text("Start Checking");
    clearInterval(interval);
  });

  const checkPups = async () => {
    await $.get("/scrape", function (data) {
      console.log(count, data);
      data.forEach(name => {
        if (name === "Bella" || name === "Otis") {
          clearInterval(interval);
          console.log("PUPPY IS BORN")
          $.get("https://cors-anywhere.herokuapp.com/https://maker.ifttt.com/trigger/new_post/with/key/bvTJmlsBTGVBzZbqL2yqA9", function () {
            console.log("Notification is Sent")
          });
        }
      })
    })
    count++;
  }

  const interval = setInterval(checkPups, 1000)
})