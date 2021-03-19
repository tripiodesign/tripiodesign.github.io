var urlSenado = 'https: //api.propublica.org/congress/v1/113/senate/members.json';
var urlHouse = 'https://api.propublica.org/congress/v1/113/house/members.json';
var initUno = {
    method: 'GET',
    headers: new Headers({ "X-API-Key" : "60kWuPbuIh4ZzR4popW7WN81llwUmDGGNUZN5dCK" })
};

var app = new Vue({
    el: '#app',
    data: {
            // Senado
            statusSenado: '',
            senadores: [],

            masCompSenado: [],            
            minCompSenado: [],

            masLealSenado: [],            
            minLealSenado: [],
            
            cantRepS: 0,
            cantDemS: 0,
            cantIndS: 0,
            votosRepS: 0,
            votosDemS: 0,
            votosIndS: 0,
            votosTotalS: 0,
            pctVotosRepS: 0,
            pctVotosDemS: 0,
            pctVotosIndS: 0,

            // House
            statusHouse: '',
            diputados: [],

            masCompHouse: [],            
            minCompHouse: [],   

            masLealHouse: [],            
            minLealHouse: [], 

            cantRepH: 0,
            cantDemH: 0,
            cantIndH: 0,
            votosRepH: 0,
            votosDemH: 0,
            votosIndH: 0,
            votosTotalH: 0,
            pctVotosRepH: 0,
            pctVotosDemH: 0,
            pctVotosIndH: 0,

            textos: [
                { id:0, 
                    titulo1: 'ACERCA DE NOSOTROS',
                    titulo2: 'SENADO',
                    titulo3: 'CONGRESO',
                    titulo4: 'ASISTENCIA',
                    titulo5: 'LEALTAD',

                },
                { id:1,
                    subTitle1: 'ANTECEDENTES DE LA TRANSPARENCIA GUBERNAMENTAL',
                    subTitle2: 'Miembros del senado',
                    subTitle3: 'Miembros de la Camara',
                },
                { id:2,
                    // Index
                    pIndex1: 'La apertura, la responsabilidad y la honestidad definen la transparencia del gobierno. En una sociedad libre, la transparencia es la obligación del gobierno de compartir información con los ciudadanos. Está en el centro de cómo los ciudadanos hacen responsables a sus funcionarios públicos. Aquí en TGIF creemos que el gobierno debe ser transparente.',
                    pIndex2: 'Los gobiernos existen para servir a la gente. La información sobre cómo los funcionarios llevan a cabo los negocios públicos y gastan el dinero de los contribuyentes debe estar disponible y fácilmente entendida. Esta transparencia permite una gobernanza buena y justa. La transparencia promueve la rendición de cuentas y brinda información a los ciudadanos sobre lo que está haciendo su gobierno.',
                    pIndex3: 'También creemos que el gobierno debe ser participativo. La participación pública aumenta la eficacia del gobierno y mejora la calidad de sus decisiones. El conocimiento está muy disperso en la sociedad y los funcionarios públicos se benefician de tener acceso a ese conocimiento disperso. Lo invitamos a utilizar nuestro sitio para participar activamente en el gobierno estadounidense.',
                    pIndex4: 'GIF trabaja para divulgar información en formas que el público pueda encontrar y usar fácilmente. Solicitamos comentarios del público para identificar la información de mayor utilidad para el público.',
                    pAntIndex1: 'En Occidente, la idea de que el gobierno debería estar abierto al escrutinio público y susceptible a la opinión pública se remonta al menos a la época de la Ilustración, cuando muchos filósofos atacaron la doctrina absolutista del secreto de Estado, una parte fundamental de su proyecto intelectual. . La aprobación de instrumentos legislativos formales con este fin también se puede rastrear hasta este momento con Suecia, por ejemplo, (que entonces incluía a Finlandia como un territorio gobernado por Suecia) promulgando leyes de libertad de prensa como parte de su constitución (Ley de Libertad de Prensa, 1766). Este enfoque, y el de los philosophes en general, está fuertemente relacionado con la historiografía reciente sobre la esfera pública del siglo XVIII.',

                    pAntIndex2: 'Influenciada por el pensamiento ilustrado, las revoluciones en América (1776) y Francia (1789), la libertad de prensa consagró disposiciones y requisitos para la contabilidad presupuestaria pública y la libertad de prensa en artículos constitucionales. En el siglo XIX, varios políticos y escritores liberales eminentes se opusieron enérgicamente a los intentos de los estadistas metterniqueos de refutar estas medidas, entre los que destacan Bentham, Mill y Acton. Influenciada por el pensamiento ilustrado, las revoluciones en América (1776) y Francia (1789), la libertad de prensa consagró disposiciones y requisitos para la contabilidad presupuestaria pública y la libertad de prensa en artículos constitucionales. En el siglo XIX, varios políticos y escritores liberales eminentes se opusieron enérgicamente a los intentos de los estadistas metterniqueos de refutar estas medidas, entre los que destacan Bentham, Mill y Acton.',
                    pAntIndex3: 'En general, se considera que el gobierno abierto es un sello distintivo de la práctica democrática contemporánea y, a menudo, está vinculado a la aprobación de leyes sobre libertad de información. Los países escandinavos afirman haber adoptado la primera legislación sobre libertad de información, que remonta los orígenes de sus disposiciones modernas al siglo XVIII y Finlandia continúa con la presunción de apertura después de obtener la independencia en 1917, aprobando su Ley de publicidad de documentos oficiales en 1951 (reemplazada por nueva legislación en 1999).',
                    pAntIndex4: 'Estados Unidos aprobó su Ley de Libertad de Información (FOIA) en 1966, las FOIA, las leyes de acceso a la información (AIA) o leyes equivalentes se aprobaron en Dinamarca y Noruega en 1970.',
                    // Senado
                    pSenado1: 'En Occidente, la idea de que el gobierno debería estar abierto al escrutinio público y susceptible a la opinión pública se remonta al menos a la época de la Ilustración, cuando muchos filósofos atacaron la doctrina absolutista del secreto de Estado, una parte fundamental de su proyecto intelectual. . La aprobación de instrumentos legislativos formales con este fin también se puede rastrear hasta este momento con Suecia, por ejemplo, (que entonces incluía a Finlandia como un territorio gobernado por Suecia) promulgando leyes de libertad de prensa como parte de su constitución (Ley de Libertad de Prensa, 1766). Este enfoque, y el de los philosophes en general, está fuertemente relacionado con la historiografía reciente sobre la esfera pública del siglo XVIII.',
                    pSenado2: 'Influenciada por el pensamiento ilustrado, las revoluciones en América (1776) y Francia (1789), la libertad de prensa consagró disposiciones y requisitos para la contabilidad presupuestaria pública y la libertad de prensa en artículos constitucionales. En el siglo XIX, varios políticos y escritores liberales eminentes se opusieron enérgicamente a los intentos de los estadistas metterniqueos de refutar estas medidas, entre los que destacan Bentham, Mill y Acton.',
                    pSenado3: 'En general, se considera que el gobierno abierto es un sello distintivo de la práctica democrática contemporánea y, a menudo, está vinculado a la aprobación de leyes sobre libertad de información. Los países escandinavos afirman haber adoptado la primera legislación sobre libertad de información, que remonta los orígenes de sus disposiciones modernas al siglo XVIII y Finlandia continúa con la presunción de apertura después de obtener la independencia en 1917, aprobando su Ley de publicidad de documentos oficiales en 1951 (reemplazada por nueva legislación en 1999).',
                    pSenado4: 'Estados Unidos aprobó su Ley de Libertad de Información (FOIA) en 1966, las FOIA, las leyes de acceso a la información (AIA) o leyes equivalentes se aprobaron en Dinamarca y Noruega en 1970.',
                    pSenado5: 'Convocado por primera vez en 1789, la composición y los poderes del Senado se establecen en el Artículo Uno de la Constitución de los Estados Unidos. Cada estado está representado por dos senadores, independientemente de la población, que sirven términos escalonados de seis años. El Senado tiene varios poderes exclusivos no otorgados a la Cámara, incluido el consentimiento a los tratados como condición previa para su ratificación y el consentimiento o la confirmación de nombramientos de secretarios de gabinete, jueces federales, otros funcionarios ejecutivos federales, oficiales militares, funcionarios reguladores, embajadores y otros. funcionarios federales uniformados, así como el juicio de funcionarios federales acusados ​​por la Cámara.',

                    pCamara1: 'El poder principal de la Cámara es aprobar leyes federales que afecten a todo el país, aunque sus proyectos de ley también deben ser aprobados por el Senado y acordados por el presidente de los Estados Unidos antes de convertirse en ley (a menos que tanto la Cámara como el Senado vuelvan a aprobar la legislación). con una mayoría de dos tercios en cada cámara). La Cámara tiene algunos poderes exclusivos: el poder de iniciar proyectos de ley de ingresos, acusar a los funcionarios (los funcionarios acusados ​​son posteriormente juzgados en el Senado) y elegir al presidente de los Estados Unidos en caso de que no haya mayoría en el Colegio Electoral.',
                    pCamara2: 'Cada estado de EE. UU. Está representado en la Cámara en proporción a su población medida en el censo, pero cada estado tiene derecho a al menos un representante.',

                    pAsist1: 'La Constitución especifica que la mayoría de los miembros constituye un quórum para hacer negocios en cada cámara. Los representantes y senadores rara vez fuerzan la presencia de quórum exigiendo llamadas de quórum; por tanto, en la mayoría de los casos, los debates continúan incluso si no hay mayoría.',
                    pAsist2: 'El Senado utiliza votaciones nominales; un secretario dice en voz alta los nombres de todos los senadores y cada senador dice "sí" o "no" cuando se anuncia su nombre. La Cámara se reserva las votaciones nominales para los asuntos más formales, ya que una votación nominal de los 435 representantes lleva bastante tiempo; normalmente, los miembros votan por dispositivo electrónico. En caso de empate, la moción en cuestión falla. En el Senado, el Vicepresidente puede (si está presente) emitir el voto de desempate.',
                }
                    
            ],
            tabla: [
                { id:0,
                    thTabla1: 'Nombre',
                    thTabla2: 'Partido',
                    thTabla3: 'Estado',
                    thTabla4: 'Antigüedad',
                    thTabla5: '% Votos + % Añadido',
                },

            ],

    },
    created(){
        console.log('Creacion de "created()" [CORRECTO]');  
        console.log('MLS'+ this.masLealSenado.length)
        
        this.fetchSenado();
        this.fetchHouse();
        
    },
    methods:{
        // Funciones para Fec
        fetchSenado(){
            fetch(urlSenado, initUno).then(function(respSenado){
                return respSenado.json()
            }).then(this.tablaSenado);
        },
        fetchHouse(){
            fetch(urlHouse, initUno).then(function(respHouse){
                return respHouse.json()
            }).then(this.tablaHouse);
        },
        // Funciones para tablas
        tablaSenado(senateUrl){
            console.log('>> Senado <<')


            this.senadores = senateUrl.results[0].members;
            console.log(this.senadores);
            this.statusSenado = senateUrl.status;
            console.log('Datos Senado: '+ this.statusSenado);

            if (this.statusSenado == 'OK') {
                console.log('Carga de datos correcta');
                if (senateUrl) {
                    for (i = 0; i < this.senadores.length; i++) {
                        if (this.senadores[i].party == 'R') {
                            this.cantRepS++;
                            this.votosRepS = this.votosRepS + this.senadores[i].total_votes;
                        }
                        else if (this.senadores[i].party == 'D') {
                            this.cantDemS++;
                            this.votosDemS = this.votosDemS + this.senadores[i].total_votes;
                        }
                        else if (this.senadores[i].party == 'ID') {
                            this.cantIndS++;
                            this.votosIndS = this.votosIndS + this.senadores[i].total_votes;
                        }

                        this.votosTotalS = this.votosTotalS + this.senadores[i].total_votes;


                    }

                    this.pctVotosRepS = ((this.votosRepS * 100) / this.votosTotalS).toFixed(2);
                    this.pctVotosDemS = ((this.votosDemS * 100) / this.votosTotalS).toFixed(2);
                    this.pctVotosIndS = ((this.votosIndS * 100) / this.votosTotalS).toFixed(2);

                    console.log('Cant. Rep: '+ this.cantRepS);
                    console.log('Votos Rep: '+ this.votosRepS);
                    console.log('Cant. Dem: '+ this.cantDemS);
                    console.log('Votos Dem: '+ this.votosDemS);
                    console.log('Cant. Ind: '+ this.cantRepS);
                    console.log('Votos Ind: '+ this.votosIndS);
                    console.log('Total Votos: '+ this.votosTotalS);
                
                    var rango10 = ((this.senadores.length * 10) / 100);
                    console.log('rango (%) Membs: '+ rango10)

                    function ascendCompS(a, b){
                        return a.missed_votes - b.missed_votes;
                    }
                    function descendCompS(a, b){
                        return b.missed_votes - a.missed_votes;
                    }
                    
                    function ascendLealS(a, b){
                        return a.votes_with_party - b.votes_with_party;
                    }
                    function descendLealS(a, b){
                        return b.votes_with_party - a.votes_with_party;
                    }

                    this.masCompSenado = this.senadores.sort(this.ascendCompS).slice(0, rango10);
                    this.minCompSenado = this.senadores.sort(this.descendCompS).slice(0, rango10);
                    
                    this.masLealSenado = this.senadores.sort(this.ascendLealS).slice(0, rango10);
                    this.minLealSenado = this.senadores.sort(this.descendLealS).slice(0, rango10);

                    console.log('Compromiso [+|-]: ' + this.masCompSenado.length +' | '+ this.minCompSenado.length); 
                    console.log('Lealtades [+|-]: ' + this.masLealSenado.length +' | '+ this.minLealSenado.length);
                   
                    for (i=0;i<this.masLealSenado.length;i++){
                        console.log(this.masLealSenado[i].first_name);
                    } 
                    console.log('>>Menos Leal<<')
                    for (i=0;i<this.minLealSenado.length;i++){
                        console.log(this.minLealSenado[i].first_name);
                    } 
                }
            }
        },
        tablaHouse(houseUrl){
            console.log('>> House <<')


            this.diputados = houseUrl.results[0].members;
            console.log(this.diputados);
            this.statusHouse = houseUrl.status;
            console.log('Datos House: '+ this.statusHouse); 
            
            if (this.statusHouse == 'OK') {
                console.log('Carga de datos correcta');
                if (houseUrl) {
                    for (i = 0; i < this.diputados.length; i++) {
                        if (this.diputados[i].party == 'R') {
                            this.cantRepH++;
                            this.votosRepH = this.votosRepH + this.diputados[i].total_votes;
                        }
                        if (this.diputados[i].party == 'D') {
                            this.cantDemH++;
                            this.votosDemH = this.votosDemH + this.diputados[i].total_votes;
                        }
                        if (this.diputados[i].party == 'ID') {
                            this.cantIndH++;
                            this.votosIndH = this.votosIndH + this.diputados[i].total_votes;
                        }

                        this.votosTotalH = this.votosTotalH + this.diputados[i].total_votes;


                    }

                    this.pctVotosRepH = ((this.votosRepH * 100) / this.votosTotalH).toFixed(2);
                    this.pctVotosDemH = ((this.votosDemH * 100) / this.votosTotalH).toFixed(2);
                    this.pctVotosIndH = ((this.votosIndH * 100) / this.votosTotalH).toFixed(2);

                    console.log('Cant. Rep: '+ this.cantRepH);
                    console.log('Votos Rep: '+ this.votosRepH);
                    console.log('Cant. Dem: '+ this.cantDemH);
                    console.log('Votos Dem: '+ this.votosDemH);
                    console.log('Cant. Ind: '+ this.cantRepH);
                    console.log('Votos Ind: '+ this.votosIndH);
                    console.log('Total Votos: '+ this.votosTotalH);
                
                    var rango10H = ((this.diputados.length * 10) / 100);
                    console.log('rango (%) Membs: '+ rango10H)

                    function ascendCompH(a, b){
                        return a.missed_votes - b.missed_votes;
                    }
                    function descendCompH(a, b){
                        return b.missed_votes - a.missed_votes;
                    }
                    
                    function ascendLealH(a, b){
                        return a.votes_with_party - b.votes_with_party;
                    }
                    function descendLealH(a, b){
                        return b.votes_with_party - a.votes_with_party;
                    }

                    this.masCompHouse = this.diputados.sort(ascendCompH).slice(0, rango10H);
                    this.minCompHouse = this.diputados.sort(descendCompH).slice(0, rango10H);
                    this.masLealHouse = this.diputados.sort(ascendLealH).slice(0, rango10H);
                    this.minLealHouse = this.diputados.sort(descendLealH).slice(0, rango10H);
                    console.log('compromiso [+|-]: ' + this.masCompHouse.length +' | '+ this.minCompHouse.length); 
                    console.log('Lealtades [+|-]: ' + this.masLealHouse.length +' | '+ this.minLealHouse.length); 
                }
            }
        },
    },
});