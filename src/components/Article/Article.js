/* eslint-disable consistent-return */
import React from 'react';
import { Tag } from 'antd';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import getId from '../../helpFunctions/getId';
import defaultPhoto from '../../img/avatar.svg';
import Buttons from '../Buttons';
import Like from '../Like';

import style from './Article.module.scss';

export default function Article(props) {
    const user = useSelector((state) => state.userReducer.user);

    let authorizationPerson = false;
    if (user !== undefined && user !== null) {
        authorizationPerson = user.username;
    }

    const {
        func,
        title,
        description,
        slug,
        onSelected,
        onEdit,
        createdAt,
        tagList,
        favoritesCount,
        favorited,
        author,
        full,
    } = props;

    const { image, username } = author;

    const tags = tagList.map((tag) => {
        if (tag.length === 0) {
            return;
        }
        const words = func(tag, 30);
        return (
            <Tag className={style.tag} key={getId()}>
                {words}
            </Tag>
        );
    });

    const avatar = image !== undefined ? image : defaultPhoto;

    const createDate = format(new Date(createdAt), 'MMMM dd, yyyy');

    return (
        <section>
            <div className={style.header}>
                <div>
                    <div className={style.info}>
                        <button
                            type='button'
                            onClick={() => onSelected(slug)}
                            className={
                                full
                                    ? `${style.title} ${style.disabled}`
                                    : style.title
                            }
                        >
                            {func(title, 50)}
                        </button>
                        <div className={style.likes}>
                            <Like
                                favoritesCount={favoritesCount}
                                favorited={favorited}
                                slug={slug}
                            />
                        </div>
                    </div>
                    {tags}
                </div>
                <div className={style.author}>
                    <div className={style.author__info}>
                        <span>{username}</span>
                        <span className={style.date}>{createDate}</span>
                    </div>
                    <div className={style.avatar}>
                        <img src={avatar} alt='avatar' />
                    </div>
                </div>
            </div>
            <div className={style.block}>
                <div className={style.description}>
                    {func(description, 200)}
                </div>
                {full && authorizationPerson === username ? (
                    <Buttons onEdit={onEdit} />
                ) : null}
            </div>
        </section>
    );
}
