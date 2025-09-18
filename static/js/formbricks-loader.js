!function(){
  var t=document.createElement("script");
  t.type="text/javascript",
  t.async=!0,
  t.src="https://formbricks.lkw1615.synology.me/js/formbricks.umd.cjs",
  t.onload=function(){
    window.formbricks
      ? window.formbricks.setup({
          environmentId:"cm99ktuzi0009my015zzcv3j1",
          appUrl:"https://formbricks.lkw1615.synology.me"
        })
      : console.error("Formbricks library failed to load properly.");
  };
  var e=document.getElementsByTagName("script")[0];
  e.parentNode.insertBefore(t,e)
}();