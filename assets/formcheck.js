
// �ʏ�`�F�b�N�X�N���v�g

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
		
		// �`�F�b�N�{�b�N�X
		if ("checkbox" == formname.elements[j].type){
			form_name = formname.elements[j].name;
			//form_name = form_name.substr(0,form_name.length-2);
			form_name = form_name.substr(0,form_name.lastIndexOf('_',form_name.length-1));
			
			//�K�{���ڕ�����ɑ��݂��邩
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

		// �`�F�b�N�{�b�N�X
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
	
	//TYPE�Z�b�g
	for( k = 0 ; k < array_input.length ; k++ ){
		array_type[k] = formname.elements[array_input[k]].type;
//		alert(array_type[k] + ':' + array_input[k] + ':' + array_fieldname[k]);
	}


	//�K�{�`�F�b�N
	
	temp_array_name = new Array ;
	
	
	for( k = 0 ; k < array_input.length ; k++ ){
	if ( array_type[k] == 'text' ) {
		if (formname.elements[array_input[k]].value == "" ){
		
			alert(array_fieldname[k]+"�����͂���Ă��܂���");
			formname.elements[array_input[k]].focus();
			return (false);
		}
		
		
		if( formname.elements[array_input[k]].name == 'email' ){
		
			var theEmail = formname.elements[array_input[k]].value ;
		
			if (theEmail == "")
			  {
			    alert("���[���A�h���X����͂��Ă��������B");
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
			    alert ("���͂��ꂽ���[���A�h���X��\n�s���ȃA�h���X�̂悤�ł��B\n�ēx���͂������Ă��������B");
			    formname.email.focus();
			   
			    return false;
			  }
		
			}
	
	//�v���_�E��
	} else if ( array_type[k] == 'select-one' ) {
		if ( formname[array_input[k]].value == '' ) {
			alert(array_fieldname[k] + '���I������Ă��܂���');
			formname.elements[array_input[k]].focus();
			return false;
		}
	//�����s�e�L�X�g
	} else if ( array_type[k] == 'textarea' ) {
		if ( formname[array_input[k]].value == '' ) {
			alert(array_fieldname[k] + '�����͂���Ă��܂���');
			formname.elements[array_input[k]].focus();
			return false;
		}
	//�`�F�b�N�{�b�N�X
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
				alert(array_fieldname[k] + '���I������Ă��܂���');
				formname.elements[array_input[k]].focus();
				return false;
			}
		//�Ō�̃`�F�b�N�{�b�N�X
		} else {
			if ( flag == 0 ) {
				alert(array_fieldname[k] + '���I������Ă��܂���');
				formname.elements[array_input[k]].focus();
				return false;
			}
		}

	//���W�I�{�^��
	//} else if ( array_type[k] == 'radio' ) {
	} else {
		flag = 0;
		if( formname[array_input[k]].length ) { // �I��������������ꍇ
			flag = 1;
			var i;

			for(i = 0; i < formname[array_input[k]].length; i ++){

				if(formname[array_input[k]][i].checked){

					flag = 0; break;

				}

			}

		}
		else{ // �I������1�����̏ꍇ

			if(!formname[array_input[k]].checked){

				flag = 1;

			}

		}
		if(flag){

			alert(array_fieldname[k] + '���I������Ă��܂���');
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
    alert("���[���A�h���X����͂��Ă��������B");
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
    alert ("���͂��ꂽ���[���A�h���X��\n�s���ȃA�h���X�̂悤�ł��B\n�ēx���͂������Ă��������B");
    target.email.focus();
    target.email.style.backgroundColor = "RGB(248,242,143)";
	target.comment5.style.backgroundColor = "RGB(255,255,255)";
    return (false);
  }

 if (theEmail2 == "")
  {
    alert("���[���A�h���X�i�m�F�p�j����͂��Ă��������B");
    target.comment5.focus();
    target.comment5.style.backgroundColor = "RGB(248,242,143)";
	target.email.style.backgroundColor = "RGB(255,255,255)";
    return (false);
  }

  if (theEmail2 != theEmail)
  {
    alert("��̃��[���A�h���X����v���܂���B�m�F�̏㐳�������[���A�h���X����͂��Ă��������B");
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
		//alert(tmp_fieldname+"���̓`�F�b�N�J�n");
		
		//alert(formname.elements[array_input[k]].length);
		
		
		//�Ώۂ�inputObject���A�����̗v�f�̔z��ł��邩�ǂ������ׂ�B
		
		if( formname.elements[array_input[k]].length !== undefined ){
		
		//�����z�񂾂�����i�z��ւ�Reference���Ԃ�Ȃ�j
	
		//����ɁA�Ώۂ�inputObject���A�����I���\��checkbox��������A�_���a�Ŕ��f
		
			if ( formname.elements[array_input[k]][0].type === "checkbox" ){
			
				//alert("����̓`�F�b�N�{�b�N�X�ȗ\��")
			
				
				//�S�Ẵ`�F�b�N�{�b�N�X��value���擾
				var tmp_checkbox_value = "" ;
				for ( var m = 0 ; m < formname.elements[array_input[k]].length ; m++ ){
					tmp_checkbox_value += formname.elements[array_input[k]][m].checked ;						
				};
				
				
				//alert(tmp_checkbox_value);
				//alert(tmp_checkbox_value.indexOf('true'));
				
				//�������ꂪ�S��false��������
				if ( tmp_checkbox_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"�����͂���Ă��܂���");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
				
		//����ɁA�Ώۂ�inputObject���A�����I���\��selectbox��������AselectedIndex�Ŕ��f
			
			}else if ( formname.elements[array_input[k]].type === "select-one" ) {
			
				//alert("�Z���N�g�{�b�N�X����");
				
				if ( formname.elements[array_input[k]].selectedIndex == 0 ){
						alert(tmp_fieldname+"�����͂���Ă��܂���");
						formname.elements[array_input[k]].focus();
						return false ;
				}
				
		//����ɁA�Ώۂ�inputObject���A�����I���\��radiobutton��������A�_���a�Ŕ��f
			
			}else if ( formname.elements[array_input[k]][0].type === "radio" ){
				//alert("���W�I�{�^������");
				
				var tmp_radio_value = "" ;
				
				//�S�Ẵ��W�I�{�^����value���擾
				for ( var p = 0 ; p < formname.elements[array_input[k]].length ; p++ ){
					tmp_radio_value += formname.elements[array_input[k]][p].checked ;	
				}
				
				//�������ꂪ�S��false��������
				if ( tmp_radio_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"�����͂���Ă��܂���");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
			
			}else{
			
			
		//�܂��A�ʏ��inputObject�Ȃ�A2�����z��Ƃ��Ă��ꂼ����`�F�b�N
		
		
				for ( var n = 0 ; n < formname.elements[array_input[k]].length ; n++ ){
					if (formname.elements[array_input[k]][n].value === "" ){
							alert(tmp_fieldname+"�����͂���Ă��܂���");
							formname.elements[array_input[k]][n].focus();
							return (false);
					}					
				}
		
		
			}

		}else{

	//���ʂ̒P��I�u�W�F�N�g��������
	
	
		if (formname.elements[array_input[k]].value === '' ){
		
			//alert(formname.elements[array_input[k]].value)
			alert(tmp_fieldname+"�����͂���Ă��܂���");
			formname.elements[array_input[k]].focus();
			return (false);
		}
		
	//�����A�h��\�`�F�b�N�p[email2]��������
		
		if (formname.elements[array_input[k]].name === 'email2' ){
			
			if(formname.elements.email2.value !== formname.elements.email.value ){
		
			//alert(formname.elements[array_input[k]].value)
			alert("���[���A�h���X����v���܂���");
			formname.elements.email.focus();
			return (false);
			}
		}
	


		}
		

			
	}

	
	return(true);
	
}




//Ver2 Email�̃_�u���`�F�b�N�Ή��ȂǍς�




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
		//alert(tmp_fieldname+"���̓`�F�b�N�J�n");
		
		//alert(formname.elements[array_input[k]].length);
		
		if( formname.elements[array_input[k]].name == 'email' ){
		
		var theEmail = formname.elements[array_input[k]].value ;
		
		if (theEmail == "")
		  {
		    alert("���[���A�h���X����͂��Ă��������B");
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
		    alert ("���͂��ꂽ���[���A�h���X��\n�s���ȃA�h���X�̂悤�ł��B\n�ēx���͂������Ă��������B");
		    formname.email.focus();
		   
		    return (false);
		  }
		
		}
		
		
		//�Ώۂ�inputObject���A�����̗v�f�̔z��ł��邩�ǂ������ׂ�B
		
		if( formname.elements[array_input[k]].length !== undefined ){
		
		//�����z�񂾂�����i�z��ւ�Reference���Ԃ�Ȃ�j
	
		//����ɁA�Ώۂ�inputObject���A�����I���\��checkbox��������A�_���a�Ŕ��f
		
			if ( formname.elements[array_input[k]][0].type === "checkbox" ){
			
				//alert("����̓`�F�b�N�{�b�N�X�ȗ\��")
			
				
				//�S�Ẵ`�F�b�N�{�b�N�X��value���擾
				var tmp_checkbox_value = "" ;
				for ( var m = 0 ; m < formname.elements[array_input[k]].length ; m++ ){
					tmp_checkbox_value += formname.elements[array_input[k]][m].checked ;						
				};
				
				
				//alert(tmp_checkbox_value);
				//alert(tmp_checkbox_value.indexOf('true'));
				
				//�������ꂪ�S��false��������
				if ( tmp_checkbox_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"�����͂���Ă��܂���");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
				
		//����ɁA�Ώۂ�inputObject���A�����I���\��selectbox��������AselectedIndex�Ŕ��f
			
			}else if ( formname.elements[array_input[k]].type === "select-one" ) {
			
				//alert("�Z���N�g�{�b�N�X����");
				
				if ( formname.elements[array_input[k]].selectedIndex == 0 ){
						alert(tmp_fieldname+"�����͂���Ă��܂���");
						formname.elements[array_input[k]].focus();
						return false ;
				}
				
		//����ɁA�Ώۂ�inputObject���A�����I���\��radiobutton��������A�_���a�Ŕ��f
			
			}else if ( formname.elements[array_input[k]][0].type === "radio" ){
				//alert("���W�I�{�^������");
				
				var tmp_radio_value = "" ;
				
				//�S�Ẵ��W�I�{�^����value���擾
				for ( var p = 0 ; p < formname.elements[array_input[k]].length ; p++ ){
					tmp_radio_value += formname.elements[array_input[k]][p].checked ;	
				}
				
				//�������ꂪ�S��false��������
				if ( tmp_radio_value.indexOf("true") == -1 ){
					alert(tmp_fieldname+"�����͂���Ă��܂���");
					formname.elements[array_input[k]][0].focus();
					return false ;
				}
			
			}else{
			
			
		//�܂��A�ʏ��inputObject�Ȃ�A2�����z��Ƃ��Ă��ꂼ����`�F�b�N
		
		
				for ( var n = 0 ; n < formname.elements[array_input[k]].length ; n++ ){
					if (formname.elements[array_input[k]][n].value === "" ){
							alert(tmp_fieldname+"�����͂���Ă��܂���");
							formname.elements[array_input[k]][n].focus();
							return (false);
					}					
				}
		
		
			}

		}else{

	//���ʂ̒P��I�u�W�F�N�g��������
	
	
		if (formname.elements[array_input[k]].value === '' ){
		
			//alert(formname.elements[array_input[k]].value)
			alert(tmp_fieldname+"�����͂���Ă��܂���");
			formname.elements[array_input[k]].focus();
			return (false);
		}
		
	//�����A�h��\�`�F�b�N�p[email2]��������
		
		if (formname.elements[array_input[k]].name === 'email2' ){
			
			if(formname.elements.email2.value !== formname.elements.email.value ){
		
			//alert(formname.elements[array_input[k]].value)
			alert("���[���A�h���X����v���܂���");
			formname.elements.email.focus();
			return (false);
			}
		}
	


		}
		

			
	}

	
	return(true);
	
}





