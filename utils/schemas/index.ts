import {z} from 'zod'

export const SignUpSchema = z.object({
        email: z.string()
                .min(1, { message: 'El correu es obligatori' })
                .email({ message: 'Correu no vàlid' })
                .trim(),
        password: z.string()
                .min(8, { message: 'Contrasenya no vàlida, almenys 8 caracteres' })
                .trim(),
        password_confirmation: z.string().trim(),
}).refine((data) => data.password === data.password_confirmation, {
        message: 'Les contrasenyes no son iguals',
        path: ['password_confirmation']
})

/* export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
}) */

export const LoginSchema = z.object({
        email: z.string()
                .min(1, { message: 'El correu es obligatori' })
                .email({ message: 'Correu no vàlid' })
                .trim(),
        password: z.string()
                .min(8, { message: 'Contrasenya no vàlida' })
                .trim()
})

export const ResetPasswordSchema = z.object({
        password: z.string()
                .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }).trim(),
        password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
        message: "Los Passwords no son iguales",
        path: ["password_confirmation"]
})

export const ForgotPasswordSchema = z.object({
        email: z.string()
                .min(1, { message: 'El Email es Obligatorio' })
                .email({ message: 'Email no válido' }).trim(),
})

export const BotigaSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: 'El nom es obligatori' }),
  address: z.string().min(1, { message: 'L\'adreça es obligatòria' }),
  createdAt: z.date().default(() => new Date()),
  city: z.enum(['46680 Algemesi']),
  admin: z.string().min(1, { message: 'L\'administrador es obligatori' }),
  contactImage: z.string().min(1, { message: 'La imatge de contacte es obligatòria' }),
  contactName: z.string().min(1, { message: 'El nom de contacte es obligatori' }),
  email: z.string().email({ message: 'Email no vàlid' }),
  phone: z.string().max(11, { message: 'El telèfon no pot tindre més de 11 dígits' }),
  logo: z.string().min(1, { message: 'El logo es obligatori' }),
  website: z.string().url({ message: 'El website no és vàlid' }).nullable(),
  color1: z.string().default('#57534eff'),
  color2: z.string().default('#a7f3d0ff'),
  whatsapp: z.string().url().nullable(),
  facebook: z.string().url().nullable(),
  youtube: z.string().url().nullable(),
  instagram: z.string().url().nullable(),
  tiktok: z.string().url().nullable(),
  info: z.string().min(1).max(500),
  entity: z.enum(['negoci', 'organitzacio']),
  business: z.enum(['parroquia', 'esglesia', 'bar']),
})
export type Botiga = z.infer<typeof BotigaSchema>

export const EditBotigaActionSchema = z.object({
  name: z.string().min(1, { message: 'El nom es obligatori' }).trim(),
  email: z.string().email({ message: 'Email no vàlid' }).trim(),
  phone: z.string().min(1, { message: 'El telèfon es obligatori' }).trim(),
  address: z.string().min(1, { message: 'L\'adreça es obligatòria' }).trim(),
  admin: z.string().min(1, { message: 'L\'administrador es obligatori' }).trim(),
  contactName: z.string().min(1, { message: 'El nom de contacte es obligatori' }).trim(),
  website: z.string().nullable(),
  whatsapp: z.string().url().nullable(),
  facebook: z.string().url().nullable(),
  youtube: z.string().url().nullable(),
  instagram: z.string().url().nullable(),
  tiktok: z.string().url().nullable()
})
 export const EditColorPickerActionSchema = z.object({
  color1: z.string().min(1, { message: 'El color 1 es obligatori' }),
  color2: z.string().min(1, { message: 'El color 2 es obligatori' }),
 })

 export const EditImatgeContacteActionSchema = z.object({
  contactImage: z.string().min(1, { message: 'La imatge de contacte es obligatòria' })
 })
export const EditLogoActionSchema = z.object({
  logo: z.string().min(1, { message: 'El logo es obligatori' }),
})

export const EditContactImageActionSchema = z.object({
  contactImage: z.string().min(1, { message: 'La imatge de contacte es obligatòria' }),
})

const PublicacioSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  moreInfo: z.string(),
  image: z.string(),
  eventDate: z.coerce.date().nullable(),
  eventLocation: z.string().nullable(),
  createdAt: z.coerce.date(),
  botigaId: z.string().uuid(),
  grupId: z.string().uuid(),
  grupName: z.string(),
  botigaName: z.string()
})
export type Publicacio = z.infer<typeof PublicacioSchema>

export const CreatePublicacioActionSchema = z.object({
  id: z.string().uuid({ message: 'L\'ID es obligatori' }),
  title: z.string().min(1, { message: 'El títol es obligatori' }),
  description: z.string().min(1, { message: 'La descripció es obligatòria' }),
  image: z.string().url(),
  botigaId: z.string().uuid({ message: 'La botiga es obligatòria' }),
  eventDate: z.coerce.date().nullable(),
  eventLocation: z.string().nullable(),
  grupId: z.string().uuid({ message: 'El grup es obligatori' }),
  moreInfo: z.string().min(1, { message: 'La informació addicional es obligatòria' }),
  grupName: z.string().min(1, { message: 'El nom del grup es obligatori' }),
  botigaName: z.string().min(1, { message: 'El nom de la botiga es obligatori' })
})

export const DeletePublicacioActionSchema = z.object({
  id: z.string().uuid({ message: 'L\'ID es obligatori' }),
})
export const EditPublicacioActionSchema = z.object({
  title: z.string().min(1, { message: 'El títol es obligatori' }),
  description: z.string().min(1, { message: 'La descripció es obligatòria' }),
  image: z.string().url(),
  eventDate: z.coerce.date().nullable(),
  eventLocation: z.string().nullable(),
  grupId: z.string().uuid({ message: 'El grup es obligatori' }),
  moreInfo: z.string().min(1, { message: 'La informació addicional es obligatòria' }),
  grupName: z.string().min(1, { message: 'El nom del grup es obligatori' }),
})

export const GrupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  botigaId: z.string().uuid(),
  botigaName: z.string(),
  createdAt: z.date(),
  logo: z.string(),
})
export type Grup = z.infer<typeof GrupSchema>

export const CreateGrupActionSchema = z.object({
  name: z.string().min(1, { message: 'El nom del grup es obligatori' }),
  botigaId: z.string().uuid({ message: 'La botiga es obligatòria' }),
  botigaName: z.string().min(1, { message: 'El nom de la botiga es obligatori' }),
  logo: z.string().url().optional()
})
export const DeleteGrupActionSchema = z.object({
  id: z.string().uuid({ message: 'L\'ID del grup és obligatori' }),
})

export const ImatgeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date(),
  botigaId: z.string().uuid()
});
export type Imatge = z.infer<typeof ImatgeSchema>

export const CreateImatgeActionSchema = z.object({
  name: z.string(),
  botigaId: z.string().uuid({ message: 'La botiga es obligatòria' }),
  url: z.string(),
  })


export const DeleteImatgeActionSchema = z.object({
  imatgeId: z.string().uuid({ message: 'L\'ID de la imatge és obligatori' })
})

export const AvisSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  botigaId: z.string().uuid(),
  createdAt: z.coerce.date(),
  grupId: z.string().uuid(),
  grupName: z.string(),
  botigaName: z.string(),
  grupLogo: z.string()
})
export type Avis = z.infer<typeof AvisSchema>

export const CreateAvisActionSchema = z.object({
  content: z.string().min(1, { message: 'El contingut es obligatori' }),
  grupId: z.string().uuid().optional(),
  botigaId: z.string().uuid(),
  botigaName: z.string().min(1, { message: 'El nom de la botiga es obligatori' }),
  grupName: z.string().min(1, { message: 'El nom del grup es obligatori' }),
  grupLogo: z.string().url().optional()
})  
export const EditAvisActionSchema = z.object({
  content: z.string().min(1, { message: 'El contingut es obligatori' }),
  grupId: z.string().uuid(),
  grupName: z.string().min(1, { message: 'El nom del grup es obligatori' }),
  grupLogo: z.string().url()
})  
export const DeleteAvisActionSchema = z.object({
  id: z.string().uuid(),
})  
export const BlogSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  botigaId: z.string().uuid(),
  createdAt: z.coerce.date()
})
export type Blog = z.infer<typeof BlogSchema>

export const CreateBlogActionSchema = z.object({
  title: z.string().min(1, { message: 'El títol es obligatori' }),
  description: z.string().min(1, { message: 'La descripció es obligatòria' }),
  image: z.string().url(),
  botigaId: z.string().uuid({ message: 'La botiga es obligatòria' })
})
export const DeleteBlogActionSchema = z.object({
  id: z.string().uuid({ message: 'L\'ID del blog és obligatori' }),
})
export const EditBlogActionSchema = z.object({
  title: z.string().min(1, { message: 'El títol es obligatori' }),
  description: z.string().min(1, { message: 'La descripció es obligatòria' }),
  image: z.string().url(),
})  

export const CollaboradorSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.coerce.date(),
  botigaId: z.string().uuid(),
  botigaName: z.string(),
  role: z.enum(['editor', 'admin', 'maremeua']),
  email: z.string().email().nullable()
})
export type Collaborador = z.infer<typeof CollaboradorSchema>

export const DeleteCollaboradorActionSchema = z.object({
  id: z.string().uuid({ message: 'L \'ID es obligatori' }),
})

export const createCollaboradorActionSchema = z.object({
  email: z.string().email({ message: 'El correu es obligatori' }),
  botigaId: z.string().uuid({ message: 'La botiga es obligatòria' }),
  role: z.enum(['editor', 'admin', 'maremeua']),
})

export const FormulariSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  botigaId: z.string().uuid(),
  createdAt: z.date(),
  nom: z.string(),
  grup: z.string().nullable(),
})

export type Formulari = z.infer<typeof FormulariSchema>

export const CreateFormulariActionSchema = z.object({
  email: z.string().email(),
  botigaId: z.string().uuid(),
  nom: z.string(),
  grup: z.string().nullable(),
})

export const DeleteFormulariActionSchema = z.object({
  id: z.string().uuid({ message: 'L\'ID del formulari és obligatori' })
})

export const DonacioSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(), 
  message: z.string(),
  url: z.string(), 
  title: z.string(),
  botigaId: z.string(),
})
export type Donacio = z.infer<typeof DonacioSchema>
