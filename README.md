# WEB103 Project 3 - FIFA WORLDCUP 2026: Host Stadiums

Submitted by: **Kritazya Upreti**

About this web app: **A full-stack web app showcasing the host stadiums of the 2026 FIFA World Cup. Users can browse stadium locations and explore the matches scheduled at each venue, with data served from a custom API backed by a PostgreSQL database.**

Time spent: **11** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT \* FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] _Note: A non-visual list of links to different locations is insufficient._
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [ ] Users can sort _or_ filter events by location.
- [ ] Events display a countdown showing the time remaining before that event
  - [ ] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://i.imgur.com/VBXauwP.gif' title='Fifa World Cup 2026: Host Stadiums (Walk Through)' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with Kap

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.

> The trickiest part was keeping data aligned across the stack: the location ids in PostgreSQL had to match the route indexes in React and the `location_id` foreign keys on events, so each stadium showed the right matches. I also had to wire the Express controllers and routes to the Render database before the frontend services could pull data through the API.

## License

Copyright 2026 Kritazya Upreti

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
