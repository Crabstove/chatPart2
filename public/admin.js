$(function() {
    //make connection
    const endPoint = "http://localhost:3000/api";

    const eventButton = $("#events");
    const historyButton = $("#history");


    // Show event log
    eventButton.on("click", event => {
      event.preventDefault();
      const eventLogTable = $(
        `[data-table="${event.currentTarget.getAttribute("id")}"]`
      );
      eventLogTable.removeClass("d-none");
      getFromDatabase("eventlog").then(data => {
        eventLogTable.find("tbody").empty();
        data.forEach(row => {
          eventLogTable
            .find("tbody")
            .append(
              `<tr><td>${row.type}</td><td>${row.user}</td><td>${row.room}</td><td>${row.date}</td><td>${row.time}</td></tr>`
            );
        });
      });
    });
  
    //get from database
    async function getFromDatabase(url) {
      let content;
      try {
        const rawResponse = await fetch(`${endPoint}/${url}`);
        content = await rawResponse.json();
      } catch (error) {}
      return await content;
    }
  
    //show all messages
    historyButton.on("click", event => {
      event.preventDefault();
      const allChatTable = $(
        `[data-table="${event.currentTarget.getAttribute("id")}"]`
      );
      allChatTable.removeClass("d-none");
      getFromDatabase("history").then(data => {
        allChatTable.find("tbody").empty();
        data.forEach(row => {
          allChatTable
            .find("tbody")
            .append(
              `<tr><td>${row.user}</td><td>${row.date}</td><td>${row.time}</td><td>${row.room}</td><td>${row.message}</tr>`
            );
        });
      });
    });

  });
  