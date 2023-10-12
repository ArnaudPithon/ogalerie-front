"use client";

import { useState, useRef, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axiosInstance from '@/src/utils/axios';
import { Comment } from '@/src/@types';
import InputEmoji from 'react-input-emoji'
import CommentSingle from './CommentSingle'
import { create } from 'domain';

interface CommentsBlockProps {
  comments: Comment[];
  userId: string;
  artworkId: string;
}

export default function CommentsBlock({comments, userId, artworkId}: CommentsBlockProps) {
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [commentsList, setCommentsList] = useState<JSX.Element[]>();

  
  const createCommentsList = (comments: Comment[]) => {
    console.log("comments", comments);
    setCommentsList(comments.map((comment) => {
      return (
        <CommentSingle
          key={comment.id}
          avatar={comment.avatar? comment.avatar : "/DefaultAvatar.svg"}
          nickname={comment.owner}
          date={comment.created_at}
          content={comment.content}
          userId={comment.owner_id.toString()}
          id={comment.id.toString()}
          handleDelete={handleDelete}
        />
      )
    }))
  }
  
  useEffect(() => {
    createCommentsList(comments);
  }
  , []);
  
    

  const onEnter = (text: string) => {
    const payload = {
      content: text,
      artwork_id: artworkId,
    }
    axiosInstance.post(`/users/${userId}/comments`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log("res.data comments", res.data);
      comments.unshift(res.data);
      createCommentsList(comments);
    }
    ).catch((err) => {
      console.log(err);
      console.log(payload)
      throw err;
    }) 
  }

  const handleDelete = (id: string) => {
    axiosInstance.delete(`/comments/${id}`)
    .then((res) => {
      console.log("res.data", res.data);
      const newComments = comments.filter((comment) => comment.id !== parseInt(id));
      createCommentsList(newComments);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="flex flex-col justify-between overflow-hidden pt-2 h-[77vh] md:h-[35vh] md:max-h-[400px] w-[95vw] md:w-[700px] rounded-2xl border-gray-400 border-2">
      <div ref={commentsContainerRef} className="flex flex-col justify-start gap-4 overflow-auto h-[75%] pl-6 py-2">
        {commentsList}
      </div>
      <div className="flex h-[15%] md:max-h-[20%] w-[95%] mx-auto border-gray-300 border-t-2">
      <InputEmoji
          value={text}
          onChange={setText}
          borderColor='transparent'
          cleanOnEnter
          placeholder="Ajoutez un commentaire"
          aria-label="Ajoutez un commentaire"
          language='fr'
          onEnter={onEnter}
          shouldReturn
        />
      </div>
    </div>
    )
}