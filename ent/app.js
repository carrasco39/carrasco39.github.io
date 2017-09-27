$(document).ready(function () {

    //var intentContent = $("#intents .list-group");
    function writeData(name) {
        $.getJSON("json/" + name + ".json", function (data) {
            
            var intent = $(`#${name} #intents`);
            var entities = $(`#${name} #entities`);
            var dialog = $(`#${name} #dialog`);
            data.intents.forEach(function (element) {
                intent.append(`
                    <div class="panel panel-default panel-${element.intent}-${name}-${name}">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><h3>
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${element.intent}-${name}" aria-expanded="true" aria-controls="${element.intent}-${name}">
                    ${element.intent}</a></h3>
                    </div>					
                    <!-- List group -->
                    <div id="${element.intent}-${name}" class="panel-collapse collapse" role="tabpanel">
                        <ul class="list-group">
                        </ul>
                    </div>
                </div>
            `)
                for (i = 0; i < element.examples.length; i++) {
                    var intentContent = $(`#${element.intent}-${name} .list-group`);
                    intentContent.append(`<li class=\"list-group-item\">${element.examples[i].text}</li>`);
                }
            }, this);

            data.entities.forEach(function (el) {
                entities.append(`
                    <div class="panel panel-default panel-${el.entity}-${name}">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><h3>
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${el.entity}-${name}" aria-expanded="true" aria-controls="${el.entity}-${name}">
                    ${el.entity}</a></h3>
                    </div>					
                    <!-- List group -->
                    <div id="${el.entity}-${name}" class="panel-collapse collapse" role="tabpanel">
                        <ul class="list-group">
                        </ul>
                    </div>
                    </div>
                `)
                for (i = 0; i < el.values.length; i++) {
                    var entityContent = $(`#${el.entity}-${name} .list-group`);
                    entityContent.append(`<li class=\"list-group-item\"><b>${el.values[i].value}</b>${getSynonyms(el,entityContent)}</li>`);

                }
            }, this);

            data.dialog.questions.forEach(function(element, i){
                dialog.find(".table tbody").append(`<tr><th>${i+1}</th>
                <td><p><b>${element.value}</b></p></td>
                <td><p><b>${writeDialogIntents(element.intents)}</b></p></td>
                <td><p><b>${writeDialogAnswers(element.answers)}</b></p></td>
                </tr>`);
                
            });

        });

        function getSynonyms(el, entityContent) {
            var dand = "";
            for (j = 0; j < el.values[i].synonyms.length; j++) {
                if (j === 0) {
                    dand = dand + ":";
                }
                dand = dand + ` ${el.values[i].synonyms[j]}${ j + 1 > el.values[i].synonyms.length - 1 ? "" : ","}`;
            }
            return dand;
        }

        function writeDialogIntents(intents){
            var s = "";
            for(i =0; i < intents.length; i++){
                s = s + intents[i]+ "<br>";
            }

            return s;
        }
        function writeDialogAnswers(answers){
            var s = "";
            for(i =0; i < answers.length; i++){
                s = s + answers[i] + "<br>";
            }
            return s;
        }
    }


    writeData("starter");
    writeData("intermediate");
    writeData("advanced");
});