function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ 
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
}

const handleZipCode = (event) => {
    let input = event.target
    input.value = zipCodeMask(input.value)
  }
  
  const zipCodeMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
}

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}

document.addEventListener('DOMContentLoaded', function() {
  const mensagemErro = document.getElementById('mensagem-erro');
  const cepInput = document.getElementById('CEP');

  if (cepInput) {
      cepInput.addEventListener('input', function() {
          const CEP = this.value.replace(/\D/g, '');

          if (CEP.length === 8) {
              const url = `https://viacep.com.br/ws/${CEP}/json/`;

              fetch(url)
                  .then(response => response.json())
                  .then(data => {
                      if (data.erro) {
                          mensagemErro.style.display = 'block';
                          resetFields();
                      } else {
                          mensagemErro.style.display = 'none';
                          document.getElementById('Rua').value = data.logradouro;
                          document.getElementById('Número').value = data.complemento;
                          document.getElementById('Cidade').value = data.localidade;
                          document.getElementById('Estado').value = data.uf;
                      }
                  })
                  .catch(error => {
                      console.error('Erro ao buscar CEP:', error);
                      mensagemErro.style.display = 'block';
                      resetFields();
                  });
          }
      });
  }
});

function resetFields() {
    document.getElementById('Rua').value = '';
    document.getElementById('Número').value = '';
    document.getElementById('Cidade').value = '';
    document.getElementById('Estado').value = '';
        
}

document.addEventListener('DOMContentLoaded', function() {
    const documentInput = document.getElementById("Document");
    const selectedFile = document.getElementById("selectedFile");
    
    if (documentInput && selectedFile) {
      documentInput.addEventListener("change", function() {
        if (this.files.length > 0) {
          const fileName = this.files[0].name;
          selectedFile.textContent = `Documento Selecionado: ${fileName}`;
        }
      });
    } else {
      console.error('Document elements not found');
    }
    
    const comprovanteInput = document.getElementById("Comprovante");
    const comprovanteSelectedFile = document.getElementById("comprovanteSelectedFile");
    
    if (comprovanteInput && comprovanteSelectedFile) {
      comprovanteInput.addEventListener("change", function() {
        if (this.files.length > 0) {
          const fileName = this.files[0].name;
          comprovanteSelectedFile.textContent = `Documento Selecionado: ${fileName}`;
        }
      });
    } else {
      console.error('Comprovante elements not found');
    }
    
    const options = document.querySelectorAll('.grid-select-option');
    options.forEach(option => {
      option.addEventListener('click', function() {
        options.forEach(opt => opt.setAttribute('data-selected', 'false'));
        this.setAttribute('data-selected', 'true');
      });
    });
    
    const checkbox = document.getElementById('termsCheckbox');
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        console.log('Terms accepted:', this.checked);
      });
    }
});

  
var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;

  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);

document.querySelectorAll('input[required], select[required]').forEach(input => {
input.addEventListener('input', function() {
    const errorDiv = this.nextElementSibling;
    if (this.value.trim()) {
        this.style.border = '1px solid var(--Stroke-Default)';
        this.style.boxShadow = 'none';
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'none';
        }
    }
});
});

document.querySelectorAll('input[required], select[required]').forEach(input => {
  input.addEventListener('input', function() {
      if (this.value.trim()) {
          this.classList.remove('error');
          const errorMessage = this.nextElementSibling;
          if (errorMessage && errorMessage.classList.contains('error-message')) {
              errorMessage.style.display = 'none';
          }
      }
  });
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const requiredInputs = document.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
      const errorDiv = input.nextElementSibling;
      if (!input.value.trim()) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (!errorDiv || !errorDiv.classList.contains('error-message')) {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.style.marginBottom = '16px';
              msg.textContent = 'Este campo é obrigatório';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      }
  });

  if (isValid) {
      this.submit();
  }
});

document.querySelectorAll('input[required], select[required]').forEach(input => {
  input.addEventListener('input', function() {
      if (this.value.trim()) {
          this.style.border = '1px solid var(--Stroke-Default)';
          this.style.boxShadow = 'none';
          const errorDiv = this.nextElementSibling;
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.remove();
          }
      }
  });
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const requiredInputs = document.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
      const errorDiv = input.nextElementSibling;
      
      if (errorDiv && errorDiv.classList.contains('error-message')) {
          errorDiv.style.display = 'none';
      }
      
      if (!input.value.trim()) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Este campo é obrigatório';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Este campo é obrigatório';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      } 
      else if (input.type === 'email' && !isValidEmail(input.value)) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Por favor, insira um email válido';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Por favor, insira um email válido';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      }
  });

  if (isValid) {
      this.submit();
  }
});

document.getElementById('Email').addEventListener('blur', function() {
  const errorDiv = this.nextElementSibling;
  
  if (this.value.trim() && !isValidEmail(this.value)) {
      this.style.border = '1px solid var(--Semantic-Error)';
      this.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
      
      if (errorDiv && errorDiv.classList.contains('error-message')) {
          errorDiv.style.display = 'block';
          errorDiv.textContent = 'Por favor, insira um email válido';
      } else {
          const msg = document.createElement('div');
          msg.className = 'error-message';
          msg.style.color = 'var(--Semantic-Error)';
          msg.style.fontSize = '0.875rem';
          msg.style.marginTop = '4px';
          msg.textContent = 'Por favor, insira um email válido';
          this.parentNode.insertBefore(msg, this.nextSibling);
      }
  }
});


function isAtLeast15YearsOld(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  
  return age >= 15;
}


document.addEventListener('DOMContentLoaded', function() {
  const dobInput = document.getElementById('Nasc');
  
  if (dobInput) {
      dobInput.addEventListener('change', function() {
          const errorDiv = this.nextElementSibling;
          
          if (this.value && !isAtLeast15YearsOld(this.value)) {
              this.style.border = '1px solid var(--Semantic-Error)';
              this.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
              
              if (errorDiv && errorDiv.classList.contains('error-message')) {
                  errorDiv.style.display = 'block';
                  errorDiv.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
              } else {
                  const msg = document.createElement('div');
                  msg.className = 'error-message';
                  msg.style.color = 'var(--Semantic-Error)';
                  msg.style.fontSize = '0.875rem';
                  msg.style.marginTop = '4px';
                  msg.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
                  this.parentNode.insertBefore(msg, this.nextSibling);
              }
          } else if (this.value) {
              this.style.border = '1px solid var(--Stroke-Default)';
              this.style.boxShadow = 'none';
              
              if (errorDiv && errorDiv.classList.contains('error-message')) {
                  errorDiv.style.display = 'none';
              }
          }
      });
  }
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const requiredInputs = document.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
      const errorDiv = input.nextElementSibling;
      
      if (errorDiv && errorDiv.classList.contains('error-message')) {
          errorDiv.style.display = 'none';
      }
      
      if (!input.value.trim()) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Este campo é obrigatório';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Este campo é obrigatório';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      } 
      else if (input.type === 'email' && !isValidEmail(input.value)) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Por favor, insira um email válido';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Por favor, insira um email válido';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      }
      else if (input.id === 'Nasc' && !isAtLeast15YearsOld(input.value)) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      }
  });

  if (isValid) {
      this.submit();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const formInputs = form.querySelectorAll('input, select');
  const gridSelectOptions = document.querySelectorAll('.grid-select-option');
  const autoSaveKey = 'formAutoSave';
  
  loadSavedFormData();

  formInputs.forEach(input => {
      input.addEventListener('input', saveFormData);
      input.addEventListener('change', saveFormData);
  });
  
  gridSelectOptions.forEach(option => {
      option.addEventListener('click', saveFormData);
  });
  
  const termsCheckbox = document.getElementById('termsCheckbox');
  if (termsCheckbox) {
      termsCheckbox.addEventListener('change', saveFormData);
  }
  
  function saveFormData() {
      const formData = {};
      
      formInputs.forEach(input => {
          if (input.id && input.type !== 'file') {
              formData[input.id] = input.value;
          }
      });
      
      const selectedOption = document.querySelector('.grid-select-option[data-selected="true"]');
      if (selectedOption) {
          formData['selectedTrilha'] = selectedOption.querySelector('.option-label').textContent;
      }
      
      if (termsCheckbox) {
          formData['termsAccepted'] = termsCheckbox.checked;
      }
      
      localStorage.setItem(autoSaveKey, JSON.stringify(formData));
      console.log('Form data auto-saved:', formData);
}})

function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.style.display = 'block';
    
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 3000);
  } else {
    console.error('Success message element not found');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 3000);
  }
}

function hideSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.style.animation = 'fadeOut 0.5s ease-out';
    
    setTimeout(() => {
      successMessage.style.display = 'none';
      successMessage.style.animation = '';
      window.location.href = 'login.html';
    }, 500);
  } else {
    window.location.href = 'login.html';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const requiredInputs = document.querySelectorAll('input[required], select[required]');
      let isValid = true;
      
      requiredInputs.forEach(input => {
        const errorDiv = input.nextElementSibling;
        
        if (errorDiv && errorDiv.classList.contains('error-message')) {
          errorDiv.style.display = 'none';
        }
        
        if (!input.value.trim()) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Este campo é obrigatório';
          } else {
            const msg = document.createElement('div');
            msg.className = 'error-message';
            msg.style.color = 'var(--Semantic-Error)';
            msg.style.fontSize = '0.875rem';
            msg.style.marginTop = '4px';
            msg.textContent = 'Este campo é obrigatório';
            input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
        } 
        else if (input.type === 'email' && !isValidEmail(input.value)) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Por favor, insira um email válido';
          } else {
            const msg = document.createElement('div');
            msg.className = 'error-message';
            msg.style.color = 'var(--Semantic-Error)';
            msg.style.fontSize = '0.875rem';
            msg.style.marginTop = '4px';
            msg.textContent = 'Por favor, insira um email válido';
            input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
        }
        else if (input.id === 'Nasc' && !isAtLeast15YearsOld(input.value)) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
          } else {
            const msg = document.createElement('div');
            msg.className = 'error-message';
            msg.style.color = 'var(--Semantic-Error)';
            msg.style.fontSize = '0.875rem';
            msg.style.marginTop = '4px';
            msg.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
            input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
        }
      });
  
      if (isValid) {
        showSuccessMessage();
      }
    });
  }
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const requiredInputs = document.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
      const errorDiv = input.nextElementSibling;
      
      if (errorDiv && errorDiv.classList.contains('error-message')) {
          errorDiv.style.display = 'none';
      }
      
      if (!input.value.trim()) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Este campo é obrigatório';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Este campo é obrigatório';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      } 
      else if (input.type === 'email' && !isValidEmail(input.value)) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Por favor, insira um email válido';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Por favor, insira um email válido';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      }
      else if (input.id === 'Nasc' && !isAtLeast15YearsOld(input.value)) {
          input.style.border = '1px solid var(--Semantic-Error)';
          input.style.boxShadow = '0.5px -0.10px 3px 2px rgba(220, 38, 38, 0.1)';
          
          if (errorDiv && errorDiv.classList.contains('error-message')) {
              errorDiv.style.display = 'block';
              errorDiv.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
          } else {
              const msg = document.createElement('div');
              msg.className = 'error-message';
              msg.style.color = 'var(--Semantic-Error)';
              msg.style.fontSize = '0.875rem';
              msg.style.marginTop = '4px';
              msg.textContent = 'Você deve ter pelo menos 15 anos para se inscrever';
              input.parentNode.insertBefore(msg, input.nextSibling);
          }
          isValid = false;
      }
  });

  if (isValid) {
      this.submit();
  }
});
