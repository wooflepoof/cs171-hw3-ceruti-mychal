Final Project Proposal
======================

Tracking Actor Bankability Over Time
-------------------------------------

Background and Motivation
--------------------------
Like most of us, I enjoy going to the movies and . I'm also enjoy looking at the way things change over time, with regards to celebrities, It's interesting to see how their careers progressed.
Did they age with dignity and become MORE popular as they became older and more distinguished, or did they fizzle out before they were old enough to run for president?  
	
Project Objectives
-------------------
* I want to see how various movie celebrities performed over time using their total box office gross, the number of movies they were in, or if I can get my hands on the data, whether
or not they moved gracefully into retirement as an A-lister, or after a few years sunk to the C-list as a moderately successful soap opera co-star. 

* I would like to find a way to visualize an actor's "bankability" over time

* I would also like to identify trends to see who may be a rising star, who still has some fight left in them, or who is on the way out.

* Of course, it would be a pleasant surprise to find any new interesting correlations between age and bankability or some other metric.

Data
----

For data I will have to scrape from sources such as Wikipedia and IMDB. I would also like to try and contact James Ullmer's organization that creates "hot list" which is the industry standard
for determining who is and isn't a bankable star. If they could provide historical data that would be a dream come true.

Data Processing
----------------

The data processing will be implemented through web-scraping tools unless I can find an authoritative data-source that has a use-able API. Most of my data such as filmographies, box office gross, pay scales, etc can be found easily on places such as IMDB and Wikipedia. 
As far as clean-up, I expect most of the raw data will be numeric in nature, and probably won't cause much trouble, but as I found with HW3, scraping raw data can lead to annoying issues.

Visualization
--------------

The main visualization will be a scalable sliding or brushing visualisation. Possibly implementing nodes that represent various milestones, and a way to demonstrate comparisons between actors (which of the individuals in the selection is worth the most at the selected time-frame)

Must-Have Features
------------------
* I would like my visualization to span 30 years or so.

* I would like to have data on at least 20 celebrities, and allow the use to choose who is displayed in the graph.

* Information on highest grossing movie by year.

* Interactive comparisons between actors

* Scalability from decades to months or weeks

Optional Features
------------------

* Icons with pictures

* The more actors the better.

* If my list is large enough, I would like to implement a search function.

* Expanding on the information that will be presented, to include things not tied to an actors holistic value but not necessarily her bankability (i.e awards and accolades received)

* Creating or implementing data analysis tools in order to make easier the task of finding various correlations in the data. 

Project Schedule
-----------------

* The first week after posting this proposal will be spent determining how best to determine what specific data I need to determine popularity and bankability. I will also spend that time contacting private
sources for historical data and getting help constructing any algorithms that I might need to use to aggregate the data. I will also find which programming languages and their respective libraries will best help me achieve my goals.

* The next few weeks will then be spent building the prototype visualisation for presentation. I'm assuming the development of the actual algorithms that I may use will take some time to develop, but I should be able to give an idea of what it 
is I want to accomplish visually in a few weeks. 

*After the main part of the project is finished, I plan on spending the last 2 or 3 weeks tweaking the aesthetics and implementing any functionality that was beyond the scope of the main project.

