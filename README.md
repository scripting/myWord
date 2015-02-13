# myWord

<i>An easy open source way to create nice-looking web pages for essays.</i>



I have a new writing tool I'm working on and wanted it to be able to create beautiful essay pages like Medium. But Medium doesn't have an API. So I made an essay-viewer that does. ;-)

<a href="http://myword.io/">http://myword.io/</a>

Now, I'm not a great CSS hacker. That's obvious. But all that's needed is a framework to get started. That's the idea.

I'm going to keep iterating. :-)

#### Updates

##### v0.43 2/13/15 by DW

A bunch of small changes, loose-end fixes.

1. If there's an error in the JSON, we put up a dialog saying so, along with a suggestion that you use the excellent <a href="http://jsonlint.com/">JSONLINT</a> site to find the error.

2. If it's been more than a day since an article was posted, instead of saying By Mary Jones at Wednesday, we say "on Wednesday".

3. Before using any of the values in the JSON, be sure it exists. 

4. You can change the title font and the body font. See the <a href="http://myword.io/essay.json">example JSON file</a> for a clue.

