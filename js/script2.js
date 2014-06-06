jQuery(function($){
  window.scrollTo(0,0);
  var max_drop_x = 6;
  var max_drop_y = 5;
  var max_drop_count = max_drop_x * max_drop_y;
  var field_size = 640;
  var drop_size = field_size / max_drop_x;
  $('#puzzle-main').css({'width': drop_size * 6, 'height': drop_size * 5});



  const size = 100;
  var combo = 0;
  const drop_type_normal = ["heal","flame","aqua","leaf","shine","dark"];
  var drop_type = {
    "heal" : "❤",
    "flame" : "✾",
    "aqua" : "❆",
    "leaf" : "❀",
    "shine" : "✬",
    "dark" : "✡"
  };
  var hp_gauge = $("#hp span");
  var hp = 100;
  var delete_drop_count = {};
  var delete_drop_all = 0;
  var delete_combo_all = 0;

  c(Object.keys(drop_type).length);
  c(Object.keys(drop_type));

  function c(e){
    console.log(e);
  }

  function p(str){
    return parseInt(str);
  }

  function positionX(id){
    return size * ((p(id) - 1) % 6) + 2;
  }

  function positionY(id){
    return Math.floor((30 - p(id)) / 6) * size + 2;
  }

  function getDropId(left, top){
    return (Math.floor((p(left)+p(size/2))/size)+1+Math.floor((p(size*9/2)-p(top))/size)*6);
  }

  function remove_class_type(id,type){
    for(var i = 0; i < type.length; i++){
      $('#drop-id-' + id).removeClass('drop-'+type[i]);
    }
  }

  function makeDrop(init){
    if(!$('#drop-id-1').is('*')){
      for (var i = 1; i <= 30; i++){
        $('#puzzle-main').append("<span class='drop checked' id='drop-id-" + i + "'></span>");
        $('#drop-id-' + i).css('left', positionX(i));
      }
      $('.drop').css({'width': size, 'height': size, 'font-size': size * 0.8, 'line-height': size + 'px'});
    }
    for (var i = 1; i <= 30; i++) {
      if(!$('#drop-id-' + i).hasClass('checked')){
        continue;
      }
      remove_class_type(i,drop_type_normal);
      $('#drop-id-' + i).removeClass('checked');

      var color = Object.keys(drop_type)[Math.round(Math.random() * (Object.keys(drop_type).length - 1))];
      $('#drop-id-' + i).addClass('drop-'+color).text(drop_type[color]);

       $('#drop-id-' + i).css('top', positionY(i) - size * (5 + 1));
      if(!init){
         $('#drop-id-' + i).delay(3 * i).animate({top: positionY(i), "opacity": 1}, 'slow', "easeOutBounce");
      }

    }

    $('.drop').promise().done(function(){
      if(init === false){
        combo++;
      }
      else{
        combo = 0;
      }
      checkDrop(init);

    });
  }

  function fallDrop(init){
    for(var i = 1; i <= 6; i++){
      for(var j = 0; j < 5; j++){
        if($('#drop-id-' + (i + j * 6)).hasClass('checked')){
          for(var k = 1; $('#drop-id-' + (i + j * 6 + k * 6)).is('*'); k++){
            if($('#drop-id-' + (i + j * 6 + k * 6)).hasClass('checked')) continue;
            $('#drop-id-' + (i + j * 6 + k * 6)).addClass('change');
            if(init){
              $('#drop-id-'+(i + j * 6 + k * 6)).css('top', (positionY(i + j * 6) - size * 5));
            }else{
              $('#drop-id-' + (i + j * 6 + k * 6)).animate({top: positionY(i + j * 6), "opacity": 1}, 'normal', "easeOutBounce");
            }
            $('#drop-id-' + (i + j * 6)).removeAttr('id').attr('id', 'drop-id-' + (i + j * 6 + k * 6));
            $('.change').removeAttr('id').attr('id', 'drop-id-' + (i + j * 6)).removeClass('change');
            break;
          }
        }
      }
    }
    $('.drop').promise().done(function () { makeDrop(init); });
  }

  function checkDrop(init){
    var attr ="";

    var count = {"drop-heal":0,"drop-flame":0,"drop-aqua":0,"drop-leaf":0,"drop-shine":0,"drop-dark":0};

    var count_all = 0;
    var count_ob = {};

    for(var i = 1; i <= 28; i++){

      for(var j = 0; j < drop_type_normal.length; j++){
        if($('#drop-id-' + i).hasClass('drop-'+drop_type_normal[j])){
          attr = 'drop-'+drop_type_normal[j];
        }
      }

      if(!(i % 6 == 0 || i % 6 == 5) && $('#drop-id-' + (i + 1)).hasClass(attr) && $('#drop-id-' + (i + 2)).hasClass(attr)) {

        if(!$('#drop-id-' + i).hasClass('checked') && !init){
          count[attr]++;
          count_all++;
          count_ob[attr] = {
            "count": count[attr]
          };
        }
        if(!$('#drop-id-' + (i + 1)).hasClass('checked') && !init){
          count[attr]++;
          count_all++;
          count_ob[attr] = {
            "count": count[attr]
          };
        }
        if(!$('#drop-id-' + (i + 2)).hasClass('checked') && !init){
          count[attr]++;
          count_all++;
          count_ob[attr] = {
            "count": count[attr]
          };
        }

        $('#drop-id-' + i).addClass('checked');
        $('#drop-id-' + (i + 1)).addClass('checked');
        $('#drop-id-' + (i + 2)).addClass('checked');
      }

      if (i <= 18 && $('#drop-id-' + (i + 6)).hasClass(attr) && $('#drop-id-' + (i + 12)).hasClass(attr)) {

        if(!$('#drop-id-' + i).hasClass('checked') && !init){
          count[attr]++;
          count_all++;
          count_ob[attr] = {
            "count": count[attr]
          };
        }
        if(!$('#drop-id-' + (i + 6)).hasClass('checked') && !init){
          count[attr]++;
          count_all++;
          count_ob[attr] = {
            "count": count[attr]
          };
        }
        if(!$('#drop-id-' + (i + 12)).hasClass('checked') && !init){
          count[attr]++;
          count_all++;
          count_ob[attr] = {
            "count": count[attr]
          };
        }

        $('#drop-id-' + i).addClass('checked');
        $('#drop-id-' + (i + 6)).addClass('checked');
        $('#drop-id-' + (i + 12)).addClass('checked');

      }
    }
    if($('.checked').is('*') ){

      check_combo(count_all,combo,count_ob);

      $('.checked').fadeTo("fast", 0).promise().done( function () {
        $('.checked').css('top', '-' + size);
        fallDrop(init);
        if(init === false){
        }
      });
    }
    else{
      if(init){
        for(var i = 1; i <= 30; i++){
          $('#drop-id-' + i).delay(8 * i).animate({top: positionY(i),"opacity": 1}, 'slow', "easeOutBounce");
        }
      }
      $('.drop').draggable('enable');
      $("#delete span").text(0);
      $("#combo span").text(0);
      $("#delete_drop li span").text(0);
    }
  }

  function check_combo(count_all,combo,count_ob){
    $("#delete span").text(parseInt($("#delete span").text()) + count_all);
    $("#combo span").text(combo);
    delete_combo_all += combo;
    $.each(count_ob,function(i,v){
      delete_drop_count[i] += v.count;
      delete_drop_all += v.count;
      $("#delete_drop").find("."+i).find("span").text(v.count);
      if(v.count > 4 || combo > 2 || count_all > 8){
        hp_heal(v.count * 1 * (1 + combo/10));
      }
    })

  }

  function hp_heal(v){
    if(hp+v > 100){
      hp = 100;
    }
    else{
      hp += v;
    }
    hp_gauge.width(hp+"%");
  }

  $('.btn-reset').on('click', function(){
    init();
  });


  // 初期化
  function init(){
    $('.drop').draggable('destroy');

    $("#delete_drop").disableSelection().empty();
    for(var i = 0; i < Object.keys(drop_type).length; i++){
      delete_drop_count["drop-"+Object.keys(drop_type)[i]] = 0;
      $("#delete_drop").append(
        $("<li>").addClass('drop-'+Object.keys(drop_type)[i]).append(
          $("<p>").text(drop_type[Object.keys(drop_type)[i]] + " : ").append(
            $("<span>")
          )
        )
      );
    }

    $('#puzzle-main').disableSelection().empty();
    makeDrop(true);
    $("#hp").css({"opacity":1});
    hp = 100;
    delete_drop_all = 0;
    delete_combo_all = 0;
    hp_gauge.width(hp+"%");

/*
    setTimeout(function(){
      var hp_timer = setInterval(function(){
        hp -= 0.1;
        if(hp <= 0){
          hp = 0;
        }
        hp_gauge.width(hp+"%");
        if(hp <= 0){
          clearInterval(hp_timer);
          $('#puzzle-main').disableSelection().empty();
          setting(false);
        }
      },10);
    },1200);
*/


    var dropId, currentDropId;
    $('.drop').draggable({
      opacity: 0.5,
      cancel: ".cancel",
      containment: '#puzzle-main',
      start: function(event, ui){
        dropId = getDropId(ui.position.left, ui.position.top);
      },
      drag: function(event, ui){
        if(hp <= 0){
          $('.drop').draggable('disable');
          return
        }
        combo = 1;
        currentDropId = getDropId(ui.position.left, ui.position.top);
        if(dropId != currentDropId){
          $('#drop-id-' + currentDropId).animate({ left: positionX(dropId), top: positionY(dropId) }, 400, "easeOutElastic");
          $('#drop-id-' + currentDropId).removeAttr('id').attr('id', 'drop-id-' + dropId);
          $(this).removeAttr('id').attr('id', 'drop-id-' + currentDropId);

          hp -= 0.2;
          if(hp <= 0){
            hp = 0;
          }
          hp_gauge.width(hp+"%");

        }
        dropId = currentDropId;
      },
      stop:  function (event, ui) {
        $('.drop').draggable('disable');
        $(this).animate({
          left: positionX(dropId),
          top: positionY(dropId)
        }, 'fast').promise().done(function(){
          checkDrop(false);
          if(hp <= 0){
            setting(false);
          }
        });
      }
    });

  }

  function setting(start){
    $('#puzzle-main').disableSelection().empty();
    if(!start){
      $('#puzzle-main').append(
        $("<div>").addClass("result").append(
          $("<h3>").text("RESULT")
        ).append(
          $("<p>").text("消したドロップ数 = "+delete_drop_all)
        ).append(
          $("<p>").text("消した回数 = "+delete_combo_all)
        ).append(
          $("<p>").addClass("drop-heal").text(drop_type["heal"]+" = "+delete_drop_count["drop-heal"])
        ).append(
          $("<p>").addClass("drop-flame").text(drop_type["flame"]+" = "+delete_drop_count["drop-flame"])
        ).append(
          $("<p>").addClass("drop-aqua").text(drop_type["aqua"]+" = "+delete_drop_count["drop-aqua"])
        ).append(
          $("<p>").addClass("drop-leaf").text(drop_type["leaf"]+" = "+delete_drop_count["drop-leaf"])
        ).append(
          $("<p>").addClass("drop-shine").text(drop_type["shine"]+" = "+delete_drop_count["drop-shine"])
        ).append(
          $("<p>").addClass("drop-dark").text(drop_type["dark"]+" = "+delete_drop_count["drop-dark"])
        )
      );
      $('.result').css({'top': 5, 'left': (size * 6 - 300) / 2});
    }

    $('#puzzle-main').append($("<a>").attr({"id": "btn-start","href":"javascript: void(0);"}).text("スタート！"));
    $('#btn-start').css({'top': (size * 5 + 20) / 2, 'left': (size * 6 - 100) / 2});

    $('#btn-start').on('click', function(){
      init();
    });

  }

  $(document).ready(function(){
    $('#puzzle-main').css({'width': size * 6, 'height': size * 5});
//    $('#puzzle-enemy').css({'width': (size * 6)/3, 'height': (size * 5)/3});
//    $('#btn-start').css({'top': (size * 5 - 30) / 2, 'left': (size * 6 - 100) / 2});
    setting(true);
  });

});


/*
25 26 27 28 29 30
19 20 21 22 23 24
13 14 15 16 17 18
07 08 09 10 11 12
01 02 03 04 05 06
*/


