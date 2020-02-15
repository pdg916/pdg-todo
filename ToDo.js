import React,{Component} from "react"
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions,
    TextInput
} from "react-native"
import PropTypes from "prop-types"

const{width,height}=Dimensions.get("window")
export default class ToDo extends React.Component{
    constructor(props){
        super(props)
        this.state={isEditing:false,toDoValue:props.text}
    }
    static propTypes={
        text:PropTypes.string.isRequired,
        isCompleted:PropTypes.bool.isRequired,
        deleteToDo:PropTypes.func.isRequired,
        id:PropTypes.string.isRequired,
        uncompleteToDo:PropTypes.func.isRequired,
        completeToDo:PropTypes.func.isRequired,
        updateToDo:PropTypes.func.isRequired
    } 
    render(){
        const{isEditing, toDoValue}=this.state
        const{text,id,deleteToDo,isCompleted}=this.props
        return( 
        <View style={styles.container}>
            <View style={styles.column}>
            <TouchableOpacity onPress={this._toggleComplete}>
                <View 
                style={[
                    styles.circle, 
                    isCompleted ? styles.CompletedCircle:styles.uncompletedCircle
                ]}
                />
            </TouchableOpacity>
            {isEditing ? (
            <TextInput 
            style={[
                styles.text,
                styles.input,
                isCompleted ? styles.CompletedText:styles.uncompletedText]} 
            value={toDoValue}
            multiline={true}
            onChangeText={this._controllInput}
            returnKeyType={"done"}
            onBlur={this._finishEditing}
            />) : (<Text style={[
                styles.text, 
                isCompleted ? styles.CompletedText:styles.uncompletedText
                ]}>
                    {text}
                    </Text>)}
            </View>
                {isEditing ? 
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✔</Text>
                            </View>
                        </TouchableOpacity>
                    </View> : <View style={styles.actions}>
                <TouchableOpacity onPressOut={this._startEditing}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>✎</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={(event)=>{event.stopPropagation; deleteToDo(id)}}>
                    <View style={styles.actionContainer}>  
                        <Text style={styles.actionText}>✗</Text>
                    </View>
                </TouchableOpacity>
            </View>}
            </View>
        )     
    }
    _toggleComplete=(event)=>{
        event.stopPropagation()
        const {isCompleted,uncompleteToDo,completeToDo,id}=this.props
        if(isCompleted){
            uncompleteToDo(id)
        }else{
            completeToDo(id)
        }
    }
    _startEditing=(event)=>{
        event.stopPropagation()
        this.setState({isEditing:true})
    }
    _finishEditing=(event)=>{
        event.stopPropagation()
        const {toDoValue}=this.state
        const {id,updateToDo}=this.props
        updateToDo(id,toDoValue)
        this.setState({
            isEditing:false
        })
    }
    _controllInput=(text)=>{
        this.setState({
            toDoValue:text
        })
    }
}

const styles = StyleSheet.create({
    container:{
        borderBottomColor:"#bbb",
        borderBottomWidth:0.8,
        flexDirection:"row",
        alignItems:"center",
        alignItems:"center",
        justifyContent:"space-between"
        
    },
    text:{
        fontSize:17,
        fontWeight:"600",
        marginVertical:10
    },
    circle:{
        justifyContent:"center",
        width:25,
        height:25,
        borderRadius:6.5,
        borderWidth:3,
        marginLeft:10,
        marginRight:5
    },
    CompletedCircle:{
        borderColor:"#bbb"
    },
    uncompletedCircle:{
        borderColor:"#F23657"
    },
    CompletedText:{
        color:"#bbb",
        textDecorationLine:"line-through"
    },
    uncompletedText:{
        color:"#353839"
    },
    column:{
        flexDirection:"row",
        alignItems:"center",
        width:width-110
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical:7,
        marginHorizontal:6,
        
    },
    actionText:{
        fontSize:20,
    },
    input:{
        marginVertical:15
    }
})