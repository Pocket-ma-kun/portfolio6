
// 通常チェックスクリプト

function form_check(formname , input){
	array_first = new Array ;
	array_first = input.split(',');
	
	array_type = new Array ;
	array_input = new Array ;
	array_fieldname = new Array ;

	array_input_chkbox = new Array ;

	var max = formname.elements.length;
	var chcnt = 0;

	for(j = 0; j < max; j++){
		
		// チェックボックス
		if ("checkbox" == formname.elements[j].type){
			form_name = formname.elements[j].name;
			//form_name = form_name.substr(0,form_name.length-2);
			form_name = form_name.substr(0,form_name.lastIndexOf('_',form_name.length-1));
			
			//必須項目文字列に存在するか
			if ( input.indexOf(form_name) >= 0 ){
				array_input_chkbox[chcnt] = formname.elements[j].name;

				chcnt++;

			}
		}
	}
	
	chcnt = 0;
	tmp_flg = 0;
	tmp_array_input = new Array ;

	for( j = 0 ; j < array_first.length ; j++ ){

		tmp_array = new Array ;
		tmp_array = array_first[j].split('=') ;
		
		if (tmp_flg) {
			chcnt--;
		}
		tmp_flg = 0;
		array_type[j+chcnt] = '';
		array_input[j+chcnt] = tmp_array[0] ;
		array_fieldname[j+chcnt] = tmp_array[1] ;

		tmp_array_input = array_input[j+chcnt];

		// チェックボックス
		for( k = 0 ; k < array_input_chkbox.length ; k++ ){
			if ( tmp_array_input == array_input_chkbox[k].substr(0,array_input_chkbox[k].lastIndexOf('_',array_input_chkbox[k].length-1)) ) {
				array_type[j+chcnt] = formname.elements[array_input_chkbox[k]].type;
				array_input[j+chcnt] = array_input_chkbox[k] ;
				array_fieldname[j+chcnt] = tmp_array[1] ;
				chcnt ++;
				tmp_flg = 1;
			}
		}


	}
	
	//TYPEセット
	for( k = 0 ; k < array_input.length ; k++ ){
		array_type[k] = formname.elements[array_input[k]].type;
//		alert(array_type[k] + ':' + array_input[k] + ':' + array_fieldname[k]);
	}


	//必須チェック
	
	temp_array_name = new Array ;
	
	
	for( k = 0 ; k < array_input.length ; k++ ){
	if ( array_type[k] == 'text' ) {
		if (formname.elements[array_input[k]].value == "" ){
		
			alert(array_fieldname[k]+"が入力されていません");
			formname.elements[array_input[k]].focus();
			return (false);
		}
		
		
		if( formname.elements[array_input[k]].name == 'email' ){
		
			var theEmail = formname.elements[array_input[k]].value ;
		
			if (theEmail == "")
			  {
			    alert("メールアドレスを入力してください。");
			    formname.email.focus();
			    return (false);
			  }

				var newstr = "";
				var at = false;
				var dot = false;


			 if (theEmail.indexOf("@") != -1)
			  {
					at = true;
			  } 
			 else if (theEmail.indexOf(".") != -1) 
			  {
					dot = true;
			  }

			 for (var i = 0; i < theEmail.length; i++) 
			  {
					ch = theEmail.substring(i, i + 1)
					if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")
						|| (ch == "@") || (ch == ".") || (ch == "_")
						|| (ch == "-") || (ch >= "0" && ch <= "9")) {
						newstr += ch;
						if (ch == "@") {
							at=true;
						}
						if (ch == ".") {
							dot=true;
						}
					}
			  }
			 if ((at != true) || (dot != true)) 
			  {
			    alert ("入力されたメールアドレスは\n不正なアドレスのようです。\n再度入力し直してください。");
			    formname.email.focus();
			   
			    return false;
			  }
		
			}
	
	//プルダウン
	} else if ( array_type[k] == 'select-one' ) {
		if ( formname[array_input[k]].value == '' ) {
			alert(array_fieldname[k] + 'が選択されていません');
			formname.elements[array_input[k]].focus();
			return false;
		}
	//複数行テキスト
	} else if ( array_type[k] == 'textarea' ) {
		if ( formname[array_input[k]].value == '' ) {
			alert(array_fieldname[k] + 'が入力されていません');
			formname.elements[array_input[k]].focus();
			return false;
		}
	//チェックボックス
	} else if ( array_type[k] == 'checkbox' ) {
		if ( temp_array_name == '' || 
			temp_array_name.substr(0,temp_array_name.length-2) != array_input[k].substr(0,array_input[k].lastIndexOf('_',array_input[k].length-1)) ) {
			flag = 0;
			temp_array_name = array_input[k];
		}

		if (formname[array_input[k]].checked){ 
			flag = 1;
		}
		
		if ( Object.prototype.toString.call(array_input[k+1]) == '[object String]' ) {
			if (temp_array_name.substr(0,temp_array_name.length-2) != array_input[k+1].substr(0,array_input[k+1].lastIndexOf('_',array_input[k+1].length-1))  && flag == 0 ) {
				alert(array_fieldname[k] + 'が選択されていません');
				formname.elements[array_input[k]].focus();
				return false;
			}
		//最後のチェックボックス
		} else {
			if ( flag == 0 ) {
				alert(array_fieldname[k] + 'が選択されていません');
				formname.elements[array_input[k]].focus();
				return false;
			}
		}

	//ラジオボタン
	//} else if ( array_type[k] == 'radio' ) {
	} else {
		flag = 0;
		if( formname[array_input[k]].length ) { // 選択肢が複数ある場合
			flag = 1;
			var i;

			for(i = 0; i < formname[array_input[k]].length; i ++){

				if(formname[array_input[k]][i].checked){

					flag = 0; break;

				}

			}

		}
		else{ // 選択肢が1つだけの場合

			if(!formname[array_input[k]].checked){

				flag = 1;

			}

		}
		if(flag){

			alert(array_fieldname[k] + 'が選択されていません');
			return false;
		}


	}

	}
	return(true);
	
}


function double_check( target )
{

  var theEmail  = target.email.value;
  var theEmail2 = target.comment5.value;

 

 if (theEmail == "")
  {
    alert("メールアドレスを入力してください。");
    target.email.focus();
    target.email.style.backgroundColor = "RGB(248,242,143)";
	target.comment5.style.backgroundColor = "RGB(255,255,255)";
    return (false);
  }

	var newstr = "";
	var at = false;
	var dot = false;


 if (theEmail.indexOf("@") != -1)
  {
		at = true;
  } 
 else if (theEmail.indexOf(".") != -1) 
  {
		dot = true;
  }

 for (var i = 0; i < theEmail.length; i++) 
  {
		ch = theEmail.substring(i, i + 1)
		if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")
			|| (ch == "@") || (ch == ".") || (ch == "_")
			|| (ch == "-") || (ch >= "0" && ch <= "9")) {
			newstr += ch;
			if (ch == "@") {
				at=true;
			}
			if (ch == ".") {
				dot=true;
			}
		}
  }
 if ((at != true) || (dot != true)) 
  {
    alert ("入力されたメールアドレスは\n不正なアドレスのようです。\n再度入力し直してください。");
    target.email.focus();
    target.email.style.backgroundColor = "RGB(248,242,143)";
	target.comment5.style.backgroundColor = "RGB(255,255,255)";
    return (false);
  }

 if (theEmail2 == "")
  {
    alert("メールアドレス（確認用）を入力してください。");
    target.comment5.focus();
    target.comment5.style.backgroundColor = "RGB(248,242,143)";
	target.email.style.backgroundColor = "RGB(255,255,255)";
    return (false);
  }

  if (theEmail2 != theEmail)
  {
    alert("二つのメールアドレスが一致しません。確認の上正しいメールアドレスを入力してください。");
    target.comment5.focus();
    target.comment5.style.backgroundColor = "RGB(248,242,143)";
    target.email.style.backgroundColor = "RGB(248,242,143)";
    return (false);
  }
  else
  {
    return (true);
  }

}




function form_check_complex(formname , input){
	array_first = new Array ;
	array_first = input.split(',');
	
	array_input = new Array ;
	array_fieldname = new Array ;
	
	
	
	for( j = 0 ; j < array_first.length ; j++ ){
	
		//alert(array_first[j]);
		
		tmp_array = new Array ;
		tmp_array = array_first[j].split('=') ;
		
		array_input[j] = tmp_array[0] ;
		array_fieldname[j] = tmp_array[1] ;
		
		//alert("array_input="+array_input[j]);
		//alert("array_fieldname="+array_fieldname[j]);
	}
	
	
	
	for( k = 0 ; k < array_input.length ; k++ ){

		tmp_input = array_input[k];
		tmp_fieldname = array_fieldname[k];
		//alert(tmp_fieldname+"入力チェック開始");
		
		//alert(formname.elements[array_input[k]].length);
		
		
		//対象のinputObjectが、複数の要素の配列であるかどうか調べる。
		
		if( formname.elements[array_input[k]].length !== undefined ){
		
		//もし配列だったら（配列へのReferenceが返るなら）
	
		//さらに、対象のinputObjectが、複数選択可能なcheckboxだったら、論理和で判断
		
			if ( formname.elements[array_input[k]][0].type === "checkbox" ){
			
				//alert("これはチェックボックスな予感")
			
				
				//全てのチェックボックスのvalueを取得
				var tmp_checkbox_value = "" ;
				for ( var m = 0 ; m < formname.elements[array_input[k]].length ; m++ ){
					tmp_checkbox_value += formname.elements[array_input[k]][m].checked ;						
				};
				
				
				//alert(tmp_checkbox_value);
				//alert(tmp_checkbox_value.indexOf('true'));
				
				//もしこれが全てfalseだったら
				if ( tmp_checkbox_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"が入力されていません");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
				
		//さらに、対象のinputObjectが、複数選択可能なselectboxだったら、selectedIndexで判断
			
			}else if ( formname.elements[array_input[k]].type === "select-one" ) {
			
				//alert("セレクトボックスかも");
				
				if ( formname.elements[array_input[k]].selectedIndex == 0 ){
						alert(tmp_fieldname+"が入力されていません");
						formname.elements[array_input[k]].focus();
						return false ;
				}
				
		//さらに、対象のinputObjectが、複数選択可能なradiobuttonだったら、論理和で判断
			
			}else if ( formname.elements[array_input[k]][0].type === "radio" ){
				//alert("ラジオボタンかも");
				
				var tmp_radio_value = "" ;
				
				//全てのラジオボタンのvalueを取得
				for ( var p = 0 ; p < formname.elements[array_input[k]].length ; p++ ){
					tmp_radio_value += formname.elements[array_input[k]][p].checked ;	
				}
				
				//もしこれが全てfalseだったら
				if ( tmp_radio_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"が入力されていません");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
			
			}else{
			
			
		//また、通常のinputObjectなら、2次元配列としてそれぞれをチェック
		
		
				for ( var n = 0 ; n < formname.elements[array_input[k]].length ; n++ ){
					if (formname.elements[array_input[k]][n].value === "" ){
							alert(tmp_fieldname+"が入力されていません");
							formname.elements[array_input[k]][n].focus();
							return (false);
					}					
				}
		
		
			}

		}else{

	//普通の単一オブジェクトだったら
	
	
		if (formname.elements[array_input[k]].value === '' ){
		
			//alert(formname.elements[array_input[k]].value)
			alert(tmp_fieldname+"が入力されていません");
			formname.elements[array_input[k]].focus();
			return (false);
		}
		
	//メルアド二十チェック用[email2]だったら
		
		if (formname.elements[array_input[k]].name === 'email2' ){
			
			if(formname.elements.email2.value !== formname.elements.email.value ){
		
			//alert(formname.elements[array_input[k]].value)
			alert("メールアドレスが一致しません");
			formname.elements.email.focus();
			return (false);
			}
		}
	


		}
		

			
	}

	
	return(true);
	
}




//Ver2 Emailのダブルチェック対応など済み




function form_check_v2(formname , input){
	array_first = new Array ;
	array_first = input.split(',');
	
	array_input = new Array ;
	array_fieldname = new Array ;
	
	
	
	for( j = 0 ; j < array_first.length ; j++ ){
	
		//alert(array_first[j]);
		
		tmp_array = new Array ;
		tmp_array = array_first[j].split('=') ;
		
		array_input[j] = tmp_array[0] ;
		array_fieldname[j] = tmp_array[1] ;
		
		//alert("array_input="+array_input[j]);
		//alert("array_fieldname="+array_fieldname[j]);
	}
	
	
	
	for( k = 0 ; k < array_input.length ; k++ ){

		tmp_input = array_input[k];
		tmp_fieldname = array_fieldname[k];
		//alert(tmp_fieldname+"入力チェック開始");
		
		//alert(formname.elements[array_input[k]].length);
		
		if( formname.elements[array_input[k]].name == 'email' ){
		
		var theEmail = formname.elements[array_input[k]].value ;
		
		if (theEmail == "")
		  {
		    alert("メールアドレスを入力してください。");
		    formname.email.focus();
		    return (false);
		  }

			var newstr = "";
			var at = false;
			var dot = false;


		 if (theEmail.indexOf("@") != -1)
		  {
				at = true;
		  } 
		 else if (theEmail.indexOf(".") != -1) 
		  {
				dot = true;
		  }

		 for (var i = 0; i < theEmail.length; i++) 
		  {
				ch = theEmail.substring(i, i + 1)
				if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")
					|| (ch == "@") || (ch == ".") || (ch == "_")
					|| (ch == "-") || (ch >= "0" && ch <= "9")) {
					newstr += ch;
					if (ch == "@") {
						at=true;
					}
					if (ch == ".") {
						dot=true;
					}
				}
		  }
		 if ((at != true) || (dot != true)) 
		  {
		    alert ("入力されたメールアドレスは\n不正なアドレスのようです。\n再度入力し直してください。");
		    formname.email.focus();
		   
		    return (false);
		  }
		
		}
		
		
		//対象のinputObjectが、複数の要素の配列であるかどうか調べる。
		
		if( formname.elements[array_input[k]].length !== undefined ){
		
		//もし配列だったら（配列へのReferenceが返るなら）
	
		//さらに、対象のinputObjectが、複数選択可能なcheckboxだったら、論理和で判断
		
			if ( formname.elements[array_input[k]][0].type === "checkbox" ){
			
				//alert("これはチェックボックスな予感")
			
				
				//全てのチェックボックスのvalueを取得
				var tmp_checkbox_value = "" ;
				for ( var m = 0 ; m < formname.elements[array_input[k]].length ; m++ ){
					tmp_checkbox_value += formname.elements[array_input[k]][m].checked ;						
				};
				
				
				//alert(tmp_checkbox_value);
				//alert(tmp_checkbox_value.indexOf('true'));
				
				//もしこれが全てfalseだったら
				if ( tmp_checkbox_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"が入力されていません");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
				
		//さらに、対象のinputObjectが、複数選択可能なselectboxだったら、selectedIndexで判断
			
			}else if ( formname.elements[array_input[k]].type === "select-one" ) {
			
				//alert("セレクトボックスかも");
				
				if ( formname.elements[array_input[k]].selectedIndex == 0 ){
						alert(tmp_fieldname+"が入力されていません");
						formname.elements[array_input[k]].focus();
						return false ;
				}
				
		//さらに、対象のinputObjectが、複数選択可能なradiobuttonだったら、論理和で判断
			
			}else if ( formname.elements[array_input[k]][0].type === "radio" ){
				//alert("ラジオボタンかも");
				
				var tmp_radio_value = "" ;
				
				//全てのラジオボタンのvalueを取得
				for ( var p = 0 ; p < formname.elements[array_input[k]].length ; p++ ){
					tmp_radio_value += formname.elements[array_input[k]][p].checked ;	
				}
				
				//もしこれが全てfalseだったら
				if ( tmp_radio_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"が入力されていません");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
			
			}else{
			
			
		//また、通常のinputObjectなら、2次元配列としてそれぞれをチェック
		
		
				for ( var n = 0 ; n < formname.elements[array_input[k]].length ; n++ ){
					if (formname.elements[array_input[k]][n].value === "" ){
							alert(tmp_fieldname+"が入力されていません");
							formname.elements[array_input[k]][n].focus();
							return (false);
					}					
				}
		
		
			}

		}else{

	//普通の単一オブジェクトだったら
	
	
		if (formname.elements[array_input[k]].value === '' ){
		
			//alert(formname.elements[array_input[k]].value)
			alert(tmp_fieldname+"が入力されていません");
			formname.elements[array_input[k]].focus();
			return (false);
		}
		
	//メルアド二十チェック用[email2]だったら
		
		if (formname.elements[array_input[k]].name === 'email2' ){
			
			if(formname.elements.email2.value !== formname.elements.email.value ){
		
			//alert(formname.elements[array_input[k]].value)
			alert("メールアドレスが一致しません");
			formname.elements.email.focus();
			return (false);
			}
		}
	


		}
		

			
	}

	
	return(true);
	
}





