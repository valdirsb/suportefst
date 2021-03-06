import React, { Component } from 'react';
import api from '../services/api';
import { StyleSheet, StatusBar, Switch, View, TouchableOpacity, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import {
  Content,
  Text,
  ListItem,
  Container,
  Left,
  Right,
  Form,
  Item, 
  Picker,
  Icon,
  Radio,
  Body,
  Button,
   
} from "native-base";



export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entity:0,
      entitys: [],
      profileType:0,
      novo:true,
      process:true,
      processPlan:true,
      pendente:true,
      resolvido:false,
      fechado:false,
      radioBtnsData: ['Meus Chamados', 'Chamados Atribuidos', 'Todos os Chamados'],
      radioChecked: 2,
      savedsearch: [],
      savedsearchName: ""
    };
  }

  componentDidMount(){
    this.loadFullSession();
    this.loadSavedsearch();
  }

  loadFullSession = async () => {
    const response = await api.get('/getFullSession');
    const profileType = response.data.session.glpiactiveprofile.id;
    this.setState({ profileType });
};

  loadEntitys = async () => {
      const response = await api.get('/Entity',{
        params: {
            range: "0-300"
        }
      });
      const entitys = response.data.sort(this.ordenar);
      this.setState({ entitys });
  };

  loadSavedsearch = async () => {

    const response = await api.get('/savedsearch');
    const savedsearch = response.data;

    this.setState({ savedsearch });

};

  ordenar(a, b) {
    return a.completename < b.completename ? -1 :a.completename > b.completename ? 1 : 0;
  };


    render() {

      

      const pickerSavedsearch = this.state.savedsearch.map((v,k) => {
          return {key: k, label: v.name, value: v.query, section: false }
      });

        return (
        <Container>
            <Content>
            {(() => {
            if(this.state.profileType!=1){
                return <View>
      {/*   <Text style={styles.drawerTittle2}>Entidade:</Text>
            <View>
              <ModalSelector
                  data={pickerEntity}
                  initValue="ENTIDADE:   ▼"
                  optionContainerStyle={{backgroundColor: '#fff'}}
                  cancelContainerStyle={{backgroundColor: '#fff'}}
                  sectionStyle={{backgroundColor: '#184782'}}
                  sectionTextStyle={{color:'#fff'}}
                  cancelText="Fechar"
                  onChange={(option)=>{ this.setState({entity:option.value}) }} 
              />
            </View>
      */}
            
            <View>
              <ModalSelector
                  data={pickerSavedsearch}
                  supportedOrientations={['landscape']}
                  scrollViewAccessibilityLabel={'Scrollable options'}
                  optionContainerStyle={{backgroundColor: '#fff'}}
                  cancelContainerStyle={{backgroundColor: '#fff'}}
                  cancelText="Fechar"
                  sectionStyle={{backgroundColor: '#184782'}}
                  sectionTextStyle={{color:'#fff'}}
                  onChange={(option)=>{ loadSavedsearch2(option.value), this.setState({ savedsearchName: option.label }), this.props.navigation.closeDrawer() }}>

                <ListItem>
                  <Left>
                    <Text>Pesquisas Salvas</Text>
                  </Left>
                  <Right>
                    <Icon type="FontAwesome" name="star" style={{ color: '#FFCE08'}} />
                  </Right>
                </ListItem>
                
              </ModalSelector>

            </View>

            <Text style={styles.drawerTittle2}>Chamado:</Text>
            
            {this.state.radioBtnsData.map((data, key) => {
                return (
                    <ListItem key={key}>
                        {this.state.radioChecked == key ?
                            <>
                                  <Left>
                                    <Text>{data}</Text>
                                  </Left>
                                  <Right>
                                    <Radio selected={true} />
                                  </Right>
                            </>
                            :
                            <>
                                <Left>
                                  <Text>{data}</Text>
                                </Left>
                                <Right>
                                  <Radio selected={false}  onPress={()=>{this.setState({radioChecked: key})}} />
                                </Right>
                            </>
                        }
                    </ListItem>
                )
            })}
          </View>

            }
            })()}
          
            

            <Text style={styles.drawerTittle2}>Status:</Text>

            <ListItem>
              <Body>
                <Text>Novo</Text>
              </Body>
              <Switch value={this.state.novo} onValueChange={(v)=>this.setState({novo:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Processamento (Atribuído)</Text>
              </Body>
              <Switch value={this.state.process} onValueChange={(v)=>this.setState({process:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Processamento (Planejado)</Text>
              </Body>
              <Switch value={this.state.processPlan} onValueChange={(v)=>this.setState({processPlan:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Pendente</Text>
              </Body>
              <Switch value={this.state.pendente} onValueChange={(v)=>this.setState({pendente:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Resolvido</Text>
              </Body>
              <Switch value={this.state.resolvido} onValueChange={(v)=>this.setState({resolvido:v})} />
            </ListItem>
            <ListItem>
              <Body>
                <Text>Fechado</Text>
              </Body>
              <Switch value={this.state.fechado} onValueChange={(v)=>this.setState({fechado:v})} />
            </ListItem>

            <Button block style={styles.buttonFilter} 
                    onPress={() => {this.props.navigation.navigate('Home', {
                                      entidade: this.state.entity,
                                      novo: this.state.novo, 
                                      process:this.state.process,
                                      processPlan:this.state.processPlan, 
                                      pendente:this.state.pendente, 
                                      resolvido:this.state.resolvido, 
                                      fechado:this.state.fechado
                                      }),loadFilter(this.state.radioChecked),this.props.navigation.closeDrawer()}}>
              <Text>Filtrar</Text>
            </Button>

            
            </Content>
        </Container>
        )
    }
}

const styles = StyleSheet.create({
    
  drawerTittle: {
    padding: 10,
    color: "#FFF",
    backgroundColor: "rgb(78,122,179)",
    textAlign: "center",
    fontWeight: "bold",
  },
  drawerTittle2: {
    padding: 10,
    color: "#FFF",
    backgroundColor: "#D1D1D1",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonFilter: {
    marginHorizontal: 10,
    marginBottom: 15
  },
})
