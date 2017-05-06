# Iperf Tester

This app uses the Iperf3 program to test the rate of data transfer between two computer within a local network.  It is a web application that uses Node.js to run Iperf3 and distribute results.

This app was tested using both a Mac and Windows computer (both 64-bit). The code should accommodate for these two platforms.  If you do not have one of these systems or if they are not 64-bit, you may need to download a different version of Iperf.  You can find a version of the program that matches your computer here: https://iperf.fr/iperf-download.php. Place downloaded files in the main folder.

## Start the Application

This app is ran using Node.js.  If you haven't already, before downloading the app, first install Node.js on all computers that you wish to test.  Clone this repo to the computers. From the main folder of the repo, start the application on two computers by typing `npm run ip` in the terminal of each.

## Configuring the test

Choose one of the computers to run the test from.  By default this will be the server and the other computer will be the client.  At this point, you only need to configure and execute the test from this server computer.  The app on the client computer simply needs to remain running to allow the server to communicate with it.

The IP addresses and connection types need to be set before starting the test.  The IP address of the server computer should auto-populate.  You can reference the screen of the client computer to find it's IP address.

You can change the direction of the data flow by clicking on the arrow found between the two computer configuration boxes.  By default the data is sent from the client to the server.  Clicking the arrow changes the data flow from the server to the client.  This will run the Iperf program in reverse mode.  If you do not wish to use reverse mode, choose to run your test from the other computer.

## Test and results

When everything is configured, you are ready to run your test.  Press the 'Run' button to get it started.  It takes a number of seconds to perform the test.  As the test is running, avoid clicking anything to keep the test from breaking.

When the test is complete result show up below.  The results of the test are automatically saved on a hosted database.  Feel free to go to the `config.js` file to set up your own database.

To see a history of results from past tests run, click the 'Get Past Results' button.

When you are finished with the test press 'ctrl + c' on each computer to kill the node process.
