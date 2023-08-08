# Search result header structure history

This is a record of what the search result headers looked like at various
times, as a point of reference for when Google changes things.

## 2023-01-31

```
<div class="yuRUbf"> (el)
  <a href="[url]"> (linkEl)
    <br>
    <h3>[Page Title]</h3>
    <div class="TbwUpd NJjxre iUh30 ojE3Fb">
      <span class="H9lube">[Site Icon]</span>
      <div>
        <span class="VuuXrf ...">[Site Name]</span>
        <div class="byrV5b">
          <cite>[Formatted URL]</cite>
        </div>
      </div>
    </div>
  </a>
  <div class="B6fmyf ..."> (addEl)
    <div class="TbwUpd iUh30 ojE3Fb">
      ... (same contents as previous div.TbwUpd)
    </div>
    <div class="rnBE4e AvMtcb"> [More options button]
      <div jscontroller="exgaYe">
        <div class="XKprh" role="button" jsaction="RvIhPd">
          <div class="PkoSMe" aria-label="More options">
            <span class="S003Ke ZoN4Lb zlasCe SaPW2b">
              <svg>...</svg>
            </span>
          </div>
        </div>
        <span jsname="zOVa8"></span>
      </div>
    </div>
  </div>
</div>
```

After our changes:

```
<div class="yuRUbf">
  <a href="url">
    <h3>[Page Title]</h3>
  </a>
  <div class="B6fmyf ..."></div>
  <div class="btrG"> (betterEl)
    <a href="url" target="_blank" class="btrLink" style="width: 575px;"> (urlEl)
      <cite class="iUh30 bc">[Full URL]</cite> (urlCiteEl)
    </a>
    <div class="btrAdd"> (betterAddEl)
      <div class="rnBE4e AvMtcb">
        [More options button]
      </div>
    </div>
  </div>
</div>
```

There are two copies of div.TbwUpd for each result: the first is part
of the clickable link (linkEl in the code); the second is invisible
(.B6fmyf adds the style `visibility: hidden;`) and only used to put
the "More options" button at the right place.


## New "More options" button (replaces div.rnBE4e)

First observed 2023-02-14.

```
<div class="csDOgf BCF2pd ezY6nb L48a4c">
  <div jscontroller="exgaYe">
    <div class="iTPLzd rNSxBe lUn2nc" aria-label="About this result">
      <span class="D6lY4c">
        <span class="xTFaxe mBswFe zlasCe SaPW2b">
          <svg>...</svg>
        </span>
      </span>
    </div>
    <span jsname="zOVa8"></span>
  </div>
</div>
```


## 2023-08-01

Adds an extra div at the top level. Handled in #21.

```
<div class="yuRUbf"> (el)
  <div>
    <a href="url"> (linkEl)
      <br>
      <h3>[Page Title]</h3>
      <div class="TbwUpd NJjxre iUh30 ojE3Fb">
        <span class="H9lube">[Site Icon]</span>
        <div>
          <span class="VuuXrf">[Site Name]</span>
          <div class="byrV5b">
            <cite>[Formatted URL]</cite>
          </div>
        </div>
      </div>
    </a>
    <div class="B6fmyf byrV5b Mg1HEd"> (addEl)
      <div class="TbwUpd iUh30 ojE3Fb">
        ... (same contents as previous div.TbwUpd)
      </div>
      <div class="csDOgf BCF2pd L48a4c"> [About this result button]
        <div jscontroller="exgaYe">
          <div class="iTPLzd rNSxBe lUn2nc" aria-label="About this result">
            <span class="D6lY4c mBswFe">
              <span class="xTFaxe z1asCe">
                <svg>...</svg>
              </span>
            </span>
          </div>
          <span jsname="zOVa8"></span>
        </div>
      </div>
    </div>
  </div>
</div>
```
