/*
 * LinkedList.js
 * Author: Colin
 *
 * This file manages the hook system utilized by the javascript frameworks. 
 *
 * Dependancies:
 *
 */
///////////////////////////////////////  LINKED LIST  ///////////////////////////////////////
//Node that represents single item in a linked list. 
function LinkedNode(userData, list){
    //link  between node and any kind of user data specified. 
    this.userData=userData;
    this.list=list;
    this.destroy=function(){
        this.tail=null;
        this.head=null;
        this.userData=null;
        this.list=null;
    }
}
//List object used to manage the linked list data structure. 
function LinkedList(){ 
    //append a node containg specified user data to the end of the list. New node becomes the head of the linked list. 
    this.append=function(userData){
       var node= this.createNode(userData);
        if(this.length>0){
            this.head.tail=node;
            node.head=this.head;
            this.head=node;
        }else{
            this.tail=node;
            this.head=node;
        }
        this.length++;
        return node;
    }
    //prepend a node containg specified user data to the end of the list. New node becomes the tail of the linked list. 
    this.prepend=function(userData){
        var node= this.createNode(userData);
        if(this.length>0){
            this.tail.head=node;
            node.tail=this.tail;
            this.tail=node;
        }else{
            this.tail=node;
            this.head=node;
        }
        this.length++;
        return node;
    }
    this.createNode=function(userData){
        return new LinkedNode(userData, this);
    }
    this.traverse = function(callback) {
        
    	var start = this.head;
    	while(start != null) {
    		if(start.userData != null)
    			callback(start);
    		
    		start = start.head;
    	}
    }
    //remove node from linked list and null out all pointers. 
    this.destroyNode=function(node)
    {
        //if node is part of this list;
        if(node.list==this)
        {
            if(this.length==1){
                this.head=null;
                this.tail=null;
            }else{
                if(node==this.head){
                    this.head=node.head;
                }else if(node ==this.tail){
                    this.tail=node.tail;
                }else{
                    node.tail.head=node.head;
                    node.head.tail=node.tail;
                }
            }
            node.destroy();
            this.length--;
        }
    }
    this.clear=function(){
        while(this.head){
            this.destroyNode(this.head);
        }
    }
    this.length=0;
}