interface UserModel {
  id: number
  name: string
  email?: any
  mobile?: any
  secret?: any
  avatar?: any
  nickname?: any
  createdAt: string
  updatedAt: string
  secret: SecretModel
}

interface SecretModel {
  id: number
  secret: string
  endTime: string
  userId: number
  houdunrenId: number
}

interface SoftModel {
  id: number
  title: string
  name: string
  pro: boolean
  version: string
  download: string
  description: string
  content: string
  preview: string
  github?: any
  gitee?: any
  createdAt: string
  updatedAt: string
}

interface CommentModel {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  userId: number
  softId: number
  commentId?: any
  replyId: number
  replys: CommentModel[]
  user: UserModel
}

interface NotificationModel {
  id: number
  commentId: number
  comment: CommentModel
  createdAt: string
  updatedAt: string
}

interface ConfigModel {}
